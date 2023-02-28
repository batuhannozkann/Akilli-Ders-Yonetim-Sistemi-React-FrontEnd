import axios from "axios";
import React,{useEffect, useState} from "react";
import {Form,Segment,Button,Header} from "semantic-ui-react";
import SuccessMessage from "./SuccesMessage";
const ForgotPassword = ()=>{
    const [success,setSuccess] = useState(false);
    const [formValues,setFormValues] = useState({
        Email:"",
    })
    const onChangeHandler = (e)=>{
        setFormValues({...formValues,[e.target.name]:e.target.value})
    }
    const input ={
        id:1,
        name:"Email",
        type:"email",
        placeholder:".......@gmail.com",
        errorMessage:"Email boş bırakılamaz ve geçerli bir adres olmalıdır.",
        label:"Email",
        required:true,
        pattern:"[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
    }
    const submitHandler =()=>{
        axios.get("https://localhost:7082/api/User/ResetPassword?userName="+formValues.Email)
        .then((response)=>{console.log(response);setSuccess(true)}).catch((e)=>{console.log(e)});
        

    }
    return (
        
        <>{success?<SuccessMessage Message={"Şifre sıfırlama linki email adresinize gönderilmiştir lütfen kontrol ediniz."}></SuccessMessage>:""}
        <><Header textAlign="center" style={{ fontSize: '2em', marginTop: '15vh' }}>ŞİFRE SIFIRLAMA</Header><Segment className="center text container inverted " style={{ marginTop: '5vh' }}>
            <Form>
                <Form.Field key={input.id}>
                    <label style={{ color: "white" }}>{input.label}</label>
                    <input {...input} onChange={onChangeHandler} value={formValues[input.name]} />
                    <span>{input.errorMessage}</span>
                </Form.Field>
                <Button onClick={submitHandler} style={{ backgroundColor: "#027373", color: "white" }} type='submit'>SIFIRLA</Button>
            </Form>
        </Segment></></>
        )
}
export default ForgotPassword;