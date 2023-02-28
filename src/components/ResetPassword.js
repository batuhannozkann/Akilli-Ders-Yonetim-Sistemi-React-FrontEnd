
import axios from "axios";
import React,{useEffect, useState} from "react";
import {Header,Segment,Form,Button} from "semantic-ui-react"
import SuccessMessage from "./SuccesMessage";

const ResetPassword=(props)=>{
    const [success,setSuccess] = useState(false);
    const [formValues,setFormValues] = useState({
        Password:"",
        PasswordValid:""
    })
    useEffect(()=>{
        setTokenUsername({userName:props.location.pathname.split("/")[props.location.pathname.split("/").length-1],
        token:props.location.pathname.split("SifremiSifirla/",2)[1]});
    },[])
    const [tokenUsername,setTokenUsername] = useState({
        userName:"",
        token:"",
        password:""
    })
    const onChangeHandler = (e)=>{
        setFormValues({...formValues,[e.target.name]:e.target.value})
    }
    console.log(formValues);
    const inputs =[
        {
            id:1,
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
            id:2,
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
     const onSubmitHandler=()=>{
        axios.post("https://localhost:7082/api/User/UpdatePassword",{UserName:props.location.pathname.split("/")[props.location.pathname.split("/").length-1].toString(),
        Password:formValues.Password.toString(),
        Token:props.location.pathname.split("/")[props.location.pathname.split("/").length-2].toString()
    })
        .then((response)=>{console.log(response);
            response.status==200?setSuccess(true):setSuccess(false)
        }).catch((e)=>{console.log(e)});
     }
    return(
                
            <>{success?<SuccessMessage Message="Şifreniz başarıyla değiştirilmiştir"></SuccessMessage>:""}
            <Header textAlign="center" style={{ fontSize: '2em', marginTop: '15vh' }}>ŞİFRE SIFIRLAMA</Header><Segment className="center text container inverted " style={{ marginTop: '5vh' }}>
            <Form >
                {inputs.map((i) => {
                    return (
                        <Form.Field key={i.id}>
                            <label style={{ color: "white" }}>{i.label}</label>
                            <input {...i} onChange={onChangeHandler} value={formValues[i.name]} />
                            <span>{i.errorMessage}</span>
                        </Form.Field>);

                })}
                <Button onClick={onSubmitHandler} style={{ backgroundColor: "#027373", color: "white" }} type='submit'>SIFIRLA</Button>
            </Form>
        </Segment></>
           )
}
export default ResetPassword;