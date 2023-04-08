import React,{useEffect, useState} from "react"
import {Form,Button,Segment,Header} from "semantic-ui-react"
import axios from "axios";
import { calculateNewValue } from "@testing-library/user-event/dist/utils";
import ErrorMessage from "./ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { authorization , authenticated} from "../stores/auth";

const Register = (props)=>{
    const auth = useSelector(state=>state.auth.user);
    const dispatch = useDispatch();
    console.log(auth);
    useEffect(()=>{
    
        auth?props.history.push("/"):console.log("Kayıt olabilir");
    },[auth])
    console.log(auth)
    const [message,setMessage] = useState([]);
    const checkMessage = message.length!==0;
    const [formValues,setFormValues] = useState({
        FirstName:"",
        LastName:"",
        Email:"",
        StudentNumber:"",
        Password:"",
        PasswordValid:""
    })
    const onChange = (e)=>{
        
        setFormValues(
            {...formValues,[e.target.name]:e.target.value}
            );
        
    };
    const postForm = async (user)=>{
         try{
            await axios.post("https://localhost:7082/api/User",user)
            .then((data) =>{
            });
            props.history.push("/");
        }
        catch(error)
        {
            setMessage(error.response.data.errors);
        }
        
    }
    const handlerSubmit = (e)=>{
       e.preventDefault();
       postForm(formValues);
       
      
    }
    
    const inputs=[
        {
            id:1,
            name:"FirstName",
            type:"text",
            placeholder:"İsminiz",
            errorMessage:"İsim 3-16 karakter arası olmalıdır ve boş bırakılamaz.",
            label:"İsim",
            required:true,
            pattern:"[A-Za-z]{3-16}",
            maxLength:16
        },
        {
            id:2,
            name:"LastName",
            type:"text",
            placeholder:"Soyisminiz",
            errorMessage:"Soyisim 3-16 karakter arası olmalıdır ve boş bırakılamaz.",
            label:"Soyisim",
            required:true,
            pattern:"[A-Za-z]{2-16}",
            maxLength:16
        },
        {
            id:3,
            name:"Email",
            type:"email",
            placeholder:".......@gmail.com",
            errorMessage:"Email boş bırakılamaz ve geçerli bir adres olmalıdır.",
            label:"Email",
            required:true,
            pattern:"[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
        },
        {
            id:4,
            name:"StudentNumber",
            type:"text",
            placeholder:"123456789",
            errorMessage:"Öğrenci no boş bırakılamaz ve sadece rakamlardan oluşmalıdır.",
            label:"Öğrenci No",
            required:true,
            pattern:"{[0-9]{5-12}}",
            maxLength:12
        },
        {
            id:5,
            name:"Password",
            type:"password",
            placeholder:"B123456b",
            errorMessage:"Şifre en az bir büyük harf,bir küçük harf,bir rakam içermelidir ve 8-16 karakter arası olmalıdır",
            label:"Şifre",
            required:true,
            pattern:"(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,16}",
            maxLength:16
        },
        {
            id:6,
            name:"PasswordValid",
            type:"password",
            placeholder:"B123456b",
            errorMessage:"Girdiğiniz şifre ile uyuşmuyor.",
            label:"Şifre Doğrulama",
            required:true,
            pattern:formValues.Password,
            maxLength:16
        }
    ]
    return (
        <div>
            {<div style={{marginTop:10}}>{checkMessage ?<ErrorMessage Message={message}/>:""}</div>}
        <><Header textAlign="center" style={{fontSize:'2em',marginTop:20}}>KAYIT OL</Header>
        <Segment className="center text container inverted " >
            <Form onSubmit={handlerSubmit}>

                {inputs.map((i) => {
                    return (
                        <Form.Field key={i.id}>
                            <label style={{color:"white"}}>{i.label}</label>
                            <input {...i} value={formValues[i.name]} onChange={onChange} />
                            <span>{i.errorMessage}</span>
                        </Form.Field>);

                })}
                <Button style={{backgroundColor:"#027373",color:"white"}} type='submit'>Kayıt Ol</Button>
            </Form>
        </Segment></>
        </div>
        )
}

export default Register;