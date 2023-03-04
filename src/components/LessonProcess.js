import { Grid,Icon,Table,Header,Button, TableRow,Progress,Container,Segment } from "semantic-ui-react";
import axios, { isCancel } from "axios"
import react,{useEffect, useState} from "react";
import {storage} from "../firebase-client"
import {ref,uploadBytesResumable,getDownloadURL,deleteObject} from "firebase/storage"
import {Link} from "react-router-dom"
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import EditLesson from "./EditLesson";
import { useDispatch,useSelector } from "react-redux";
import {loading,loadingFalse} from "../stores/auth"
import ErrorMessage from "./ErrorMessage"
import { isDisabled } from "@testing-library/user-event/dist/utils";

const LessonProcess=(props)=>{
    useEffect(()=>{
        { axios.get("https://localhost:7082/api/Lesson")
    .then((response)=>{console.log(response);
        setLesson(response.data.data);
    }).catch((e)=>{console.log(e)});
    }
        { axios.get(`https://localhost:7082/api/Lesson/GetLesson?id=${selectedLesson.id}`)
    .then((response)=>{
        setLessonFiles(response.data.data.lessonFiles)
    }).catch((e)=>{console.log(e)});}
},[])
    const [postFile,setPostFile]=useState({
        lessonId:"",
        fileName:"",
    });
    const [errorMessage,setErrorMessage] = useState([]);
    const checkMessage = errorMessage.length!==0;
    const [uploadMessage,setUploadMessage] = useState("");
    const [error,setError] = useState(false);
    const [progress,setProgress] = useState(0);
    const [file, setFile] = useState('');
    const [lesson,setLesson] = useState([]);
    const [lessonFiles,setLessonFiles] = useState([]);
    const [selectedLesson,setSelectedLesson] = useState({
        id:"",
        lessonCode:"",
    });
    const changeFile = async (e)=>{
        await setFile(e.target.files[0]);
        setPostFile({lessonId:selectedLesson.id,fileName:e.target.files[0].name,fileUrl:" "})
    };
    const uploadFile=()=>{
        const fileRef=ref(storage,`${selectedLesson.lessonCode}/${file.name}`);
        const Task = uploadBytesResumable(fileRef,file);
        if(selectedLesson.lessonCode!=="")
        Task.on('state_changed', 
  (snapshot) => {
    setUploadMessage("Dosya Yükleniyor");
    setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  },
  (error) => {
        console.log(error);
  }, 
  () => {
        getDownloadURL(Task.snapshot.ref).then((downloadURL) => { if(postFile.lessonId!==""){
            axios.post("https://localhost:7082/api/Lesson/AddFileToLesson",{...postFile,fileUrl:downloadURL}).
            then((response)=>{console.log(response);setError(false);setErrorMessage([]);setUploadMessage("Dosya Yüklendi");}).catch((e)=>{setError(true);setUploadMessage("Hata");setErrorMessage(e.response.data.errors);console.log(e);});}
      });
      console.log(postFile);
        
  }
);
    };
    const onClickGetLesson =()=>{
        axios.get(`https://localhost:7082/api/Lesson/GetLesson?id=${selectedLesson.id}`)
        .then((response)=>{
            setLessonFiles(response.data.data.lessonFiles);
            console.log(response);
        }).catch((e)=>{console.log(e)});
    }
    const onClickDelete =(fileId,filename)=>{
        const fileRef=ref(storage,`${selectedLesson.lessonCode}/${filename}`);
        deleteObject(fileRef).catch((e)=>{console.log(e)});
        axios.post('https://localhost:7082/api/Lesson/DeleteFile',{id:fileId})
        .then((response)=>{console.log(response)})
        .catch((e)=>{console.log(e)});
    }
        console.log(selectedLesson);
    return(
        <Container style={{minHeight:"100vh"}}>
    <Grid fluid style={{margin:"2%"}}>
        <Grid.Row columns={2} >
            <Grid.Column width={5}>
            <Header>Ders Seç</Header>
        <select onChange={(e)=>{lesson.map((i)=>{return(i.id==e.target.value?setSelectedLesson({id:i.id,lessonCode:i.lessonCode}):""),
        e.target.value=="default"?setSelectedLesson({id:"",lessonCode:""}):"",
        e.target.value=="default"?setPostFile({...postFile,lessonId:""}):setPostFile({...postFile,lessonId:e.target.valuex}),
        setLessonFiles([]);})}}>
            <option value={"default"}>Ders Seçiniz</option>
            {lesson.map((i)=>{return(
                <option value={i.id}>{i.name}</option>)}
            )}
        </select>
        <br/>
        <Button onClick={onClickGetLesson} className="primary button" style={{marginTop:'3%'}}>Dersi Getir</Button>
        <div style={{marginTop:10}}>
              <EditLesson LessonId = {selectedLesson.id}></EditLesson>
        </div>
        <div style={{marginTop:'10%'}}>
          <Header>Dosya Yükle</Header>
        <input className="" type="file" onChange={changeFile}></input>
        <br/>
        <button style={{marginTop:'2%'}}type="submit" onClick={uploadFile}>
        Yükle</button>
        </div>
        <Segment inverted>
    <Progress percent={progress} inverted progress className={error==true?"error":"success"}>
      {uploadMessage}
    </Progress>
    </Segment>
    {checkMessage?
    <ErrorMessage Message={errorMessage}></ErrorMessage>:""}
        </Grid.Column>
        <Grid.Column width={3}></Grid.Column>
        <Grid.Column width={7}>
        <Table celled striped>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell colSpan='4'>Ekli Dosyalar</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {lessonFiles.map((i)=> {return(
        <Table.Row>
        <Table.Cell collapsing>
          <Icon name='folder' /> {i.fileName}
        </Table.Cell>
        <Table.Cell width={2} collapsing textAlign='right'>
        <Link onClick={()=>{window.open(i.fileUrl,'_blank')}}><Icon name='download'></Icon></Link>
        </Table.Cell>
        <Table.Cell width={2} collapsing textAlign='right'>
        <Link onClick={()=>{confirmAlert({
                title: 'Confirm to submit',
                message: 'Silmek istediğine emin misin?',
                buttons: [
                  {
                    label: 'Yes',
                    onClick: () =>{onClickDelete(i.id,i.fileName);
                    window.location.reload();}
                    },
                  {
                    label: 'No',
                    onClick: () => isCancel(confirmAlert)
                  }
                ]
              });
              }}><Icon name='delete'></Icon></Link>
        </Table.Cell>
      </Table.Row>)}
)}
    </Table.Body>
  </Table>
  
        </Grid.Column>
        </Grid.Row>

    </Grid></Container>);
}
export default LessonProcess;