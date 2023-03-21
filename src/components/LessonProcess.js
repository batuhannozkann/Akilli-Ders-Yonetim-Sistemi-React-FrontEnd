import { Grid,Icon,Table,Header,Button,Progress,Container,Segment} from "semantic-ui-react";
import {BrowserRouter as Router , Route, useLocation} from "react-router-dom";
import axios, { isCancel } from "axios"
import react,{useEffect, useState} from "react";
import {storage} from "../firebase-client"
import {ref,uploadBytesResumable,getDownloadURL,deleteObject} from "firebase/storage"
import {Link} from "react-router-dom"
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import EditLesson from "./EditLesson";
import ErrorMessage from "./ErrorMessage"
import AddLesson from "./AddLesson";
import LessonDelete from "./LessonDelete"
import LessonUpload from "./LessonUpload"

const LessonProcess=(props)=>{
    const [icons,setIcons] = useState({
      add:true,
      delete:false,
      edit:false,
      upload:false
    });
    return(
      <Router>
        <Container style={{minHeight:"100vh"}}>
          <div style={{marginTop:20,textAlign:"center"}}>
          <Link onClick={()=>{setIcons({add:true,edit:false,delete:false,upload:false})}}><Icon name="add" className="big"></Icon></Link>
          <Link onClick={()=>{setIcons({add:false,edit:true,delete:false,upload:false})}} style={{paddingLeft:20}}><Icon name="edit" className="big"></Icon></Link>
          <Link onClick={()=>{setIcons({add:false,edit:false,delete:true,upload:false})}} style={{paddingLeft:20}}><Icon name="delete" className="big"></Icon></Link>
          <Link onClick={()=>{setIcons({add:false,edit:false,delete:false,upload:true})}} style={{paddingLeft:20}}><Icon name="upload" className="big"></Icon></Link>
          </div>
    <Grid fluid style={{margin:"2%"}}>
        <div style={{marginTop:10}}>
              {
                icons.add==true?<AddLesson></AddLesson>:""
              }
              {
                icons.edit==true?<EditLesson></EditLesson>:""
              }
              {
                icons.delete==true?<LessonDelete></LessonDelete>:""
              }
              {
                icons.upload==true?<LessonUpload></LessonUpload>:""
              }
        </div>
    </Grid></Container></Router>);
}
export default LessonProcess;