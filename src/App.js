import React, { useEffect } from "react";
import NavbarNm from "./components/NavbarNm";
import NavbarSm from "./components/NavbarSm";
import { useMediaQuery } from 'react-responsive'
import {BrowserRouter as Router , Route, useLocation} from "react-router-dom";
import Hakkinda from "./components/Hakkinda";
import HomePage from "./components/HomePage";
import Register from "./components/Register";
import Login from "./components/Login";
import { useDispatch, useSelector } from "react-redux";
import {login,setLessons} from "./stores/auth";
import axios from "axios";
import LessonList from "./components/LessonList";
import AboutUser from "./components/AboutUser";
import ResetPassword from "./components/ResetPassword";
import ForgotPassword from "./components/ForgotPassword";
function App() {
  const dispatch = useDispatch();
  const location = useSelector(state=>state.todo);
  dispatch(setLessons(JSON.parse(sessionStorage.getItem("Lessons"))))
  useEffect(()=>{
    if(sessionStorage.getItem("accessToken"))
    {
      dispatch(setLessons(JSON.parse(sessionStorage.getItem("Lessons"))))
      dispatch(login(JSON.parse(sessionStorage.getItem("User"))));
    
         axios.get("https://localhost:7082/api/Auth/AuthValid",{headers:{
          'Authorization':'Bearer '+sessionStorage.getItem("accessToken")
        }}).then((response)=>console.log(response)).catch((e)=>{
          console.log(e.response.status);
          if(e.response.status==401)
          {
            axios.post("https://localhost:7082/api/Auth/CreateTokenByRefreshToken",{RefreshToken:sessionStorage.getItem("refreshToken")})
              .then((response)=>{
                sessionStorage.removeItem("accessToken");
                sessionStorage.removeItem("refreshToken");
                sessionStorage.setItem("accessToken",response.data.data.accessToken);
                sessionStorage.setItem("refreshToken",response.data.data.refreshToken);
              }).catch((e)=>{
                sessionStorage.clear();
              });
          }
        })
      
    }
  },[location])
  const md = useMediaQuery({ query: "(min-width:768px)" });
  return (
    <Router>
    <div className="App"  >
      <header className="App-header container "style={{height:'100vh',backgroundColor:"#EFEFEE"}}>
        {md?<NavbarNm/>:<NavbarSm/>}
        <Route path="/" exact component={HomePage}></Route>
        <Route path="/Hakkinda" component={Hakkinda}></Route>
        <Route path="/Kayitol" component ={Register}></Route>
        <Route path="/Giris" component={Login}></Route>
        <Route path="/Dersler" component={LessonList}></Route>
        <Route path="/Bilgiler" component={AboutUser}></Route>
        <Route path="/SifremiSifirla" component={ResetPassword}></Route>
        <Route path="/SifremiUnuttum" component={ForgotPassword}></Route>
      </header>
    </div>
    </Router>
  );
}

export default App;
