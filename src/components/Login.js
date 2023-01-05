import React,{useEffect, useState} from "react";
import axios from "axios";
import {useDispatch,useSelector} from "react-redux";
import { authenticated,login,logout } from "../stores/auth";
import {Header,Segment,Form,Button,Message} from "semantic-ui-react";
import ErrorMessage from "./ErrorMessage"


const Login = (props)=>{
    useEffect(()=>{
        const token = sessionStorage.getItem("accessToken");
        if(token){
            props.history.push("/");
        }
    },[])
    const auth = useSelector((state)=>state.auth.user);
    const dispatch = useDispatch();
    const user = useSelector((state)=>state.auth)
    const [message,setMessage] = useState([]);
    const [loginForm,setLoginForm] = useState({
        UserName:"",
        Password:""
    });
    const checkMessage = message.length!==0
    const onChange = (e)=>{
        setLoginForm({...loginForm,[e.target.name]:e.target.value});
    }
    const handlerSubmit = (e)=>{
        e.preventDefault();
        postForm(loginForm);
        props.history.push("/")
    }
        const postForm = async (loginForm)=>{
            try{
               await axios.post("https://localhost:7082/api/Auth",loginForm)
                .then((response)=>{
                    console.log(response.data.data);
                    sessionStorage.setItem("accessToken",JSON.stringify(response.data.data.accessToken));
                    sessionStorage.setItem("User",JSON.stringify(response.data.data.user));
                    dispatch(login(response.data.data.user));
                });
            }
            catch(e)
            {
                console.log({e});
            }
           
        } 

    const inputs = [
        {
            id:1,
            name:"UserName",
            type:"text",
            placeholder:"Kullanıcı adı/Ogrenci no",
            errormessage:"Boş bırakılamaz",
            label:"Kullanıcı adı/Ogrenci no",
            required:true,
            pattern:"[A-Za-z]{1-16}",
            maxLength:16
        },
        {
            id:2,
            name:"Password",
            type:"password",
            placeholder:"B123456b",
            errormessage:"Şifre en az bir büyük harf,bir küçük harf,bir rakam içermelidir ve 8-16 karakter arası olmalıdır",
            label:"Şifre",
            required:true,
            pattern:"(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,16}",
            maxLength:16
        }
    ]
    

    return(
            
            <>{ checkMessage?<ErrorMessage Message={message}/>:<div></div>}<>
            <Header textAlign="center" style={{ fontSize: '2em', marginTop: '15vh' }}>GİRİŞ YAP</Header>
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
                <Button style={{ backgroundColor: "#027373", color: "white" }} type='submit'>Giriş Yap</Button>
            </Form>
        </Segment></></>);
}
export default Login;