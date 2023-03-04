
import axios, { isCancel } from "axios";
import React, { useEffect, useState } from "react";
import { Grid, Header,Button, Form, Segment,List,Container} from "semantic-ui-react"
import {Link} from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { authorization } from "../stores/auth";
import { jsonEval } from "@firebase/util";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


const AboutUser = (props)=>{
    const dispatch=useDispatch();
    const userLessons= JSON.parse(sessionStorage.getItem("Lessons"));
    const user = useSelector(state=>state.auth.userProps);
    const [myLessons,setMyLessons] = useState([]);

   
    const [lessons,setLessons] = useState([]);
    const [value, setValue] = useState({
        name:"",
        lessonId:"",
        lessonCode:"",
        academicianId:"",
        studentNumber:""
        })
    const [addedLesson,setAddedLesson] = useState([]);
    const refreshClick = ()=>{
        getLessons();
        window.location.reload();
    }
    const addedLessonHandler = (e)=>{
        if(addedLesson.filter(a=>a.id==value.id)==false && value.id!="")
        {setAddedLesson([...addedLesson,value])}
    }
    const getLessons=()=>{
        try{
            axios.get(`https://localhost:7082/api/Student/GetLessonsOfStudent/${user.studentNumber}`).
        then((response)=>{
            console.log(response.data.data[0].lessons);
            sessionStorage.removeItem("Lessons");
            sessionStorage.setItem("Lessons",JSON.stringify(response.data.data[0]));
        })}
        catch(e)
        {
            console.log(e);
        }}
    useEffect(()=>{
        dispatch(authorization());
        axios.get(`https://localhost:7082/api/Student/GetLessonsOfStudent/${userLessons.studentNumber}`)
        .then((response)=>{setMyLessons(response.data.data[0].lessons)}).catch(e=>{console.log(e)});
        try{
            axios.get("https://localhost:7082/api/Lesson")
            .then((response)=>{
                setLessons(response.data.data);
            });
        }
        catch(e)
        {
            console.log(e);
        }
    },[])
    const deleteLessons= (LessonStudent)=>{
         axios.post("https://localhost:7082/api/Student/DeleteLessonOfStudent",LessonStudent)
        .then((response)=>{console.log(response);}).catch((e)=>{console.log(e)});
    }
    const postLessons= (LessonStudentList)=>{
         axios.post("https://localhost:7082/api/Student/AddLessonOfStudent",LessonStudentList).
        then((response)=>{console.log(response)
        }).catch((e)=>{console.log(e)});
    }
    const postClick = ()=>{
        postLessons(addedLesson.map(x=>({LessonId:x.id.toString(),StudentNumber:x.studentNumber.toString()})));
    }
    
    const lessonsOptions =[];
        lessons.map((i)=>{
            lessonsOptions.push({key:i.id,name:i.lessonCode,text:i.name,value:i.lessonCode});
        });

    return (
        <Container style={{height:"100vh"}}>
        <Grid >
            <Grid.Row columns={2} >
            <Grid.Column style={{ marginTop: "5%" }} width={8}>
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='Ad' value={user.firstName} placeholder='Read only' readOnly />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='Soyad' value={user.lastName} placeholder='Read only' readOnly />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='Ogrenci No' value={user.studentNumber} placeholder='Read only' readOnly />
                    </Form.Group>
                </Form>
            </Grid.Column>
            <Grid.Column width={8} style={{ marginTop: "5%" }}>
                <Header>DERS EKLE</Header>
                <Form>
                    <Form.Field>
                        <select onChange={(e) => { lessons.map((i => { return (i.id == e.target.value ? setValue({ ...i, lessonId: i.id, studentNumber: user.studentNumber }) : ""); })); } } name="lessons" multiple={false} class="ui fluid dropdown  selection">
                            <option>Ders Seçiniz</option>
                            {lessons.map((i) => {

                                return (
                                    <option value={i.id}>{i.name}</option>);
                            })}
                        </select>
                    </Form.Field>
                </Form>
                <Button onClick={addedLessonHandler} className="primary" style={{ marginTop: 10 }}>Ders Ekle</Button>
                <Segment divided>
                    <List divided>
                        {addedLesson.map((i) => {
                            return (
                                <List.Item>
                                    <Link onClick={() => { addedLesson.splice(addedLesson.indexOf(i), 1); } }><List.Icon
                                        style={{ paddingLeft: "98%" }} name="trash alternate"></List.Icon></Link>
                                    <List.Icon name='book' size='large' verticalAlign='middle' />
                                    <List.Content>
                                        <List.Header as='a'>{i.name}</List.Header>
                                        <List.Description as='a'>{i.lessonCode}</List.Description>
                                    </List.Content>
                                </List.Item>);
                        })}
                    </List>
                </Segment>
                <Button onClick={()=>{postClick();window.location.reload();}} className="primary" style={{ marginTop: 10 }}>Gönder</Button>
                <Button onClick={refreshClick} className="primary" style={{ marginTop: 10 }}>Yenile</Button>
                <Segment divided>
                    <Header>ALDIĞIM DERSLER</Header>
                    <List divided>
                        {myLessons.map((i) => {
                            const obj = i;
                            return (
                                <List.Item key={i.id}>
                                    <Link onClick={()=>{
            confirmAlert({
                title: 'Confirm to submit',
                message: 'Silmek istediğine emin misin?',
                buttons: [
                  {
                    label: 'Yes',
                    onClick: () => {deleteLessons({ LessonId: String(obj.lesson.id), StudentNumber: String(user.studentNumber) });window.location.reload();}
                  },
                  {
                    label: 'No',
                    onClick: () => isCancel(confirmAlert)
                  }
                ]
              });
        }}>
            <List.Icon
                                        style={{ paddingLeft: "98%" }} name="trash alternate"></List.Icon></Link>
                                    <List.Icon name='book' size='large' verticalAlign='middle' />
                                    <List.Content>
                                        <List.Header as='a'>{i.lesson.name}</List.Header>
                                        <List.Description as='a'>{i.lesson.lessonCode}</List.Description>
                                    </List.Content>
                                </List.Item>);
                            })}
                    </List>
                </Segment>
            </Grid.Column>
            </Grid.Row>
        </Grid>
        </Container>
             
    )
;
}
export default AboutUser;