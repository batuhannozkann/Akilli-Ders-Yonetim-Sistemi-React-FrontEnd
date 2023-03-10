import React,{useEffect, useState} from "react";
import axios from "axios";
import {useDispatch,useSelector} from "react-redux";
import { authenticated,login,logout,setLessons } from "../stores/auth";
import {Header,Segment,Form,Button,Message,Container} from "semantic-ui-react";
import ErrorMessage from "./ErrorMessage"
import {Link} from "react-router-dom"
import { calculateNewValue } from "@testing-library/user-event/dist/utils";


const Login = (props)=>{
    const dispatch = useDispatch();
    const [message,setMessage] = useState([]);
    const [loginForm,setLoginForm] = useState({
        UserName:"",
        Password:""
    });
    const auth = useSelector((state)=>state.auth.user);
    useEffect(()=>{
        if(auth==true)
        {
            props.history.push("/");
        }
    },[auth])
    useEffect(()=>{
        const token = sessionStorage.getItem("accessToken");
        if(token){
            props.history.push("/");
        }
    },[])
    const checkMessage = message.length!==0
    const onChange = (e)=>{
        setLoginForm({...loginForm,[e.target.name]:e.target.value});
    }
    const handlerSubmit = (e)=>{
        e.preventDefault();
        postForm(loginForm);
    }
    const getLessons=()=>{
        try{
            axios.get(`https://localhost:7082/api/Student/GetLessonsOfStudent/${loginForm.UserName}`).
        then((response)=>{
            console.log(response.data.data[0].lessons);
            sessionStorage.setItem("Lessons",JSON.stringify(response.data.data[0]));
        })}
        catch(e)
        {
            console.log(e);
        }
    }
        const postForm = async (loginForm)=>{
            try{
               await axios.post("https://localhost:7082/api/Auth",loginForm)
                .then((response)=>{
                    console.log(response.data.data);
                    sessionStorage.setItem("accessToken",response.data.data.accessToken);
                    sessionStorage.setItem("refreshToken",response.data.data.refreshToken);
                    sessionStorage.setItem("User",JSON.stringify(response.data.data.user));
                    dispatch(login(response.data.data.user));
                    getLessons();
                });
            }
            catch(e)
            {
                setMessage(e.response.data.errors);
            }
           
        } 

    const inputs = [
        {
            id:1,
            name:"UserName",
            type:"text",
            placeholder:"Kullan??c?? ad??/Ogrenci no",
            errormessage:"Bo?? b??rak??lamaz",
            label:"Kullan??c?? ad??/Ogrenci no",
            required:true,
            maxLength:16
        },
        {
            id:2,
            name:"Password",
            type:"password",
            placeholder:"B123456b",
            errormessage:"??ifre en az bir b??y??k harf,bir k??????k harf,bir rakam i??ermelidir ve 8-16 karakter aras?? olmal??d??r",
            label:"??ifre",
            required:true,
            pattern:"(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,16}",
            maxLength:16
        }
    ]
    

    return(
        <Container style={{minHeight:"100vh"}}>
            <>{ checkMessage?<ErrorMessage Message={message}/>:<div></div>}<>
            <Header textAlign="center" style={{ fontSize: '2em', marginTop: '15vh' }}>G??R???? YAP</Header>
            <Segment className="center text container inverted " style={{ marginTop: '5vh' }}>
            <Form onSubmit={handlerSubmit}>
                {inputs.map((i) => {
                    return (
                        <Form.Field key={i.id}>
                            <label style={{ color: "white" }}>{i.label}</label>
                            <input {...i} value={loginForm[i.name]} onChange={onChange} />
                            <span>{i.errormessage}</span>
                        </Form.Field>);
                        

                })}
                <Link to="/SifremiUnuttum">Sifremi Unuttum</Link>
                <br/>
                <Button style={{ backgroundColor: "#027373", color: "white",marginTop:"2%" }} type='submit'>Giri?? Yap</Button>
            </Form>
        </Segment></></></Container>);
}
export default Login;