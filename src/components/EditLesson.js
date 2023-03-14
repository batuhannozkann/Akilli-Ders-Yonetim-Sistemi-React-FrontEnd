import react,{useEffect, useState} from "react";
import {Form,Button,Header,Container, TextArea} from "semantic-ui-react";
import {Link} from "react-router-dom"
import axios from "axios";
const EditLesson = (props)=>{
    const [lessonId,setLessonId] = useState();
    const [academicians,setAcademicians] = useState([]);
    const [academicianInput,setAcademicianInput] = useState({});
    const [lessons,setLessons] = useState([]);
    const [lesson,setLesson] = useState({
        name:"",
        lessonCode:"",
        academicianId:"",
        description:"",
    });
    useEffect(()=>{
        axios.get("https://localhost:7082/api/Lesson")
    .then((response)=>{console.log(response);
        setLessons(response.data.data);
    }).catch((e)=>{console.log(e)});
        axios.get("https://localhost:7082/api/Academicians").then((response)=>{console.log(response.data.data);setAcademicians(response.data.data)}).catch((e)=>{console.log(e)});
    }
    ,[]);
    const getLesson=(e)=>{
        if(lessonId!="")
        {
            axios.get(`https://localhost:7082/api/Lesson/GetLesson?id=${lessonId}`)
    .then((response)=>{console.log(response.data.data);setLesson({name:response.data.data.name,lessonCode:response.data.data.lessonCode,academicianId:response.data.data.academicianId,description:response.data.data.description});setAcademicianInput(response.data.data.academician);})
    .catch((e)=>console.log(e));
        }
        setLesson({name:"",
        lessonCode:"",
        academicianId:""});
    }
    useEffect(()=>{
        getLesson();
    },[lessonId])
    const onChange =(e)=>{
        setLesson({...lesson,[e.target.name]:e.target.value})
    }
    const selectAcademician = (e)=>{
        setLesson({...lesson,academicianId:e.target.value})
    }
    const postLesson =(e)=>{
        axios.post("https://localhost:7082/api/Lesson/UpdateLesson",lesson).then((response)=>{console.log(response)}).catch((e)=>console.log(e));
        window.location.reload();
    }
    console.log(lessons);
    return(
        <Container>
            <Header>Dersi Düzenle</Header>
    <Form onSubmit={postLesson}>
        <Form.Field>
            <select onChange={(e)=>{setLessonId(e.target.value)}}>
                {lessons.map((i)=>{
                    return(
                        <option value={i.id}>{i.name}</option>
                    )
                })}
            </select>
        </Form.Field>
    <Form.Field>
      <label>Ders Adı</label>
      <input required placeholder='Ders Adı' name="name" value={lesson.name} onChange={onChange} />
      
    </Form.Field>
    <Form.Field>
      <label>Ders Kodu</label>
      <input required placeholder='Ders Kodu' name="lessonCode" value={lesson.lessonCode} onChange={onChange}/>
    </Form.Field>
    <Form.Field>
    </Form.Field>
    <Form.Field>
    <label>Öğretim Üyesi</label>
        <input readOnly value={lesson.academicianId!=""?academicianInput.title+" "+academicianInput.firstName+" "+academicianInput.lastName:""}>
        </input>
    </Form.Field>
    <Form.Field>
        <label>Öğretim Üyesi Değiştir</label>
    <select onChange={selectAcademician}>
        <option selected value=" ">Öğretim Üyesi Seçiniz</option>
        {academicians.map((i)=>{
            return(<option value={i.id}>
                {`${i.title} ${i.firstName} ${i.lastName} `}
            </option>
                )
        })}
    </select>
    </Form.Field>
    <Form.Field>
        <label>Açıklama</label>
        <TextArea required
        value={lesson.description}
        onChange={onChange}
        name="description"
        ></TextArea>
    </Form.Field>
    <Button type="submit" className="small button primary">Güncelle</Button>
  </Form></Container>)
}
export default EditLesson;
