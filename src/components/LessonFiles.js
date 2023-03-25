import axios from "axios";
import React,{useState,useEffect} from "react";
import {Table,Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";


const LessonFiles =(props)=>{
    const {id} = props.match.params;
    console.log(id);
    const [files,setFiles] = useState();
    useEffect(()=>{
        axios.get(`https://localhost:7082/api/Lesson/GetLesson?id=${id}`,{headers:{
          'Authorization':'Bearer '+sessionStorage.getItem("accessToken")
        }})
        .then((response)=>{
            console.log(response.data.data.lessonFiles)
            setFiles(response.data.data.lessonFiles);
        
        })
        .catch((e)=>{console.log(e)});
    },[]);
    return(
        <Table celled striped style={{marginTop:0}}>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell textAlign="center" colSpan='3'>DERS DOSYALARI</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
        {files?.map((i)=>{ return(
            <Table.Row>
            <Table.Cell collapsing>
              <Icon name='folder' /> {i.fileName}
            </Table.Cell>
            <Table.Cell>Initial commit</Table.Cell>
            <Table.Cell collapsing textAlign='right'>
              <Link onClick={()=>{window.open(i.fileUrl,'_blank')}}><Icon name="download"></Icon></Link>
            </Table.Cell>
          </Table.Row>
        )}
        )}
    </Table.Body>
  </Table>);
}
export default LessonFiles;