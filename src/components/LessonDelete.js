import React,{useState,useEffect} from "react";
import axios from "axios";
import {Container,Header,Button,Form} from "semantic-ui-react";

const LessonDelete = ()=>{
    const [lessons,setLessons] = useState([]);
    const [selectedLesson,setSelectedLesson] = useState();
    useEffect(()=>{
        axios.get("https://localhost:7082/api/Lesson")
        .then((response)=>{console.log(response.data.data);setLessons(response.data.data);setSelectedLesson(response.data.data[0].id)})
        .catch((e)=>{console.log(e)});
    },[])
    const deleteLesson = ()=>{
        axios.post("https://localhost:7082/api/Lesson/DeleteLesson",{id:selectedLesson})
        .then((response)=>{console.log(response.data.data)})
        .catch((e)=>{console.log(e)})
        window.location.reload();
    }
    console.log(selectedLesson);
    return(
            <Container>
            <Header>Ders Sil</Header>
            <Form onSubmit={deleteLesson}>
                <Form.Field>
                <select onChange={(e)=>{setSelectedLesson(e.target.value)}}>
                    {lessons?.map((i)=>{return(
                        <option value={i.id}>
                            {i.name}
                        </option>
                        )}
                        )}
                    
                </select>
                </Form.Field>
                <Button type="submit" className="red">Sil</Button>
                </Form>
            </Container>
            
        )
}
export default LessonDelete;