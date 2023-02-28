import React, { useEffect } from "react";
import {Table,Icon} from "semantic-ui-react"
import { useSelector,useDispatch } from "react-redux";
import Authorization from "./Authorization";
import {authorization} from "../stores/auth"
import {Link} from "react-router-dom";

const MyLesson = (props)=>{
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(authorization());
      },[])
    const auth=useSelector(state=>state.auth.user);
    const Lessons = JSON.parse(sessionStorage.getItem("Lessons"));
    const setLessons= Lessons?.lessons;
    console.log(Lessons);
    
    return(
        <><Table className="container-fluid" celled striped style={{marginTop:0}}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell textAlign="center" colSpan='3'>DERSLERİM</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {setLessons?.map((i)=><Table.Row>
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