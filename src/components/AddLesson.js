import react,{useEffect, useState} from "react";
import {Form,Button,Header,Container, TextArea} from "semantic-ui-react";
import axios from "axios";  
const AddLesson = ()=>{
    useEffect(()=>{
        axios.get("https://localhost:7082/api/Academicians").then((response)=>{console.log(response.data.data);setAcademicians(response.data.data)}).catch((e)=>{console.log(e)});
    }
    ,[]);
    const [academicians,setAcademicians] = useState([]);
    const [academicianInput,setAcademicianInput] = useState({});
    const [lesson,setLesson] = useState({
        name:"",
        lessonCode:"",
        academicianId:"",
        description:"",
    });
    const onChange =(e)=>{
        setLesson({...lesson,[e.target.name]:e.target.value})
    }
    const selectAcademician = (e)=>{
        setLesson({...lesson,academicianId:e.target.value})
    }
    console.log(lesson);
    return(
    <Container>
    <Header>Ders Ekle</Header>
<Form>
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
export default AddLesson;