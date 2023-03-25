import React, { useEffect ,useState} from "react";
import axios from "axios"
import {Table,Icon} from "semantic-ui-react"
import { useSelector,useDispatch } from "react-redux";
import Authorization from "./Authorization";
import {authorization} from "../stores/auth"
import {Link} from "react-router-dom";

const MyLesson = (props)=>{
    const dispatch=useDispatch();
    
    const auth=useSelector(state=>state.auth.user);
    const [lessons,setLessons] = useState([]);
    const user = JSON.parse(sessionStorage.getItem("User"));
    useEffect(()=>{
        dispatch(authorization());
        axios.get(`https://localhost:7082/api/Student/GetLessonsOfStudent/${user.studentNumber}`,{headers:{
            'Authorization':'Bearer '+sessionStorage.getItem("accessToken")
          }})
        .then((response)=>{console.log(response.data.data[0].lessons);setLessons(response.data.data[0].lessons)})
        .catch((e)=>{console.log(e)});
      },[])
    console.log(lessons);
    
    return(
        <><Table className="container-fluid" celled striped style={{marginTop:0}}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell textAlign="center" colSpan='3'>DERSLERİM</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {lessons?.map((i)=><Table.Row>
                    <Table.Cell collapsing>
                       <Link to={`/Derslerim/${i.lesson.id}`}> <Icon name='folder' />{i.lesson.name}</Link>
                    </Table.Cell>
                    <Table.Cell>{i.lesson.description}</Table.Cell>
                    <Table.Cell collapsing textAlign='right'>
                        {i.lesson.academicianId}
                    </Table.Cell>
                </Table.Row>)}
                
               </Table.Body>
        </Table>
        </>
        
    )
}
export default MyLesson;