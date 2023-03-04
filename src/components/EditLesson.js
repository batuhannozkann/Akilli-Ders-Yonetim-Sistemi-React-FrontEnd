import react,{useEffect, useState} from "react";
import {Form,Button,Header,Container} from "semantic-ui-react";
import axios from "axios";
const EditLesson = (props)=>{
    const lessonId = props.LessonId;
    const [academicians,setAcademicians] = useState([]);
    const [academicianInput,setAcademicianInput] = useState({});
    const [lesson,setLesson] = useState({
        lessonName:"",
        lessonCode:"",
        academicianId:"",
    });
    useEffect(()=>{
        axios.get("https://localhost:7082/api/Academicians").then((response)=>{console.log(response.data.data);setAcademicians(response.data.data)}).catch((e)=>{console.log(e)});
    }
    ,[]);
    const getLesson=()=>{
        if(lessonId!="")
        {
            axios.get(`https://localhost:7082/api/Lesson/GetLesson?id=${lessonId}`)
    .then((response)=>{console.log(response.data.data);setLesson({lessonName:response.data.data.name,lessonCode:response.data.data.lessonCode,academicianId:response.data.data.academicianId});setAcademicianInput(response.data.data.academician);})
    .catch((e)=>console.log(e));
        }
        setLesson({lessonName:"",
        lessonCode:"",
        academicianId:""});
    }
    useEffect(()=>{
        getLesson();
    },[lessonId])
    const onChange =(e)=>{
        setLesson({...lesson,[e.target.name]:e.target.value})
    }
    console.log(lesson);
    return(
        <Container>
            <Header>Dersi Düzenle</Header>
    <Form>
    <Form.Field>
      <label>Ders Adı</label>
      <input placeholder='Ders Adı' name="lessonName" value={lesson.lessonName} onChange={onChange} />
      
    </Form.Field>
    <Form.Field>
      <label>Ders Kodu</label>
      <input placeholder='Ders Kodu' name="lessonCode" value={lesson.lessonCode} onChange={onChange}/>
    </Form.Field>
    <Form.Field>
    </Form.Field>
    <Form.Field>
    <label>Öğretim Üyesi</label>
        <input disabled value={lesson.academicianId!=""?academicianInput.title+" "+academicianInput.firstName+" "+academicianInput.lastName:""}>
        </input>
    </Form.Field>
    <Form.Field>
        <label>Öğretim Üyesi Değiştir</label>
    <select>
        <option selected>Öğretim Üyesi Seçiniz</option>
        {academicians.map((i)=>{
            return(<option value={i.id}>
                {`${i.title} ${i.firstName} ${i.lastName} `}
            </option>
                )
        })}
    </select>
    </Form.Field>
    <Button type='submit' className="small primary">Güncelle</Button>
  </Form></Container>)
}
export default EditLesson;