import React, { useEffect } from "react";
import NavbarNm from "./components/NavbarNm";
import NavbarSm from "./components/NavbarSm";
import { useMediaQuery } from 'react-responsive'
import {BrowserRouter as Router , Route} from "react-router-dom";
import Hakkinda from "./components/Hakkinda";
import HomePage from "./components/HomePage";
import Register from "./components/Register";
import Login from "./components/Login";
import { useDispatch } from "react-redux";
import {login} from "./stores/auth";
import axios from "axios";
function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    if(sessionStorage.getItem("accessToken"))
    {
      dispatch(login(JSON.parse(sessionStorage.getItem("User"))));
      try{
        axios.get("https://localhost:7082/api/Auth/AuthValid",{headers:{
          'Authorization':'Bearer'+sessionStorage.getItem("accessToken")
        }}).then((response)=>{
          console.log(response.data)
        });
      }
      catch(e)
      {
        console.log({e});
      }
    }
  },[])
  const md = useMediaQuery({ query: "(min-width:768px)" });
  return (
    <Router>
    <div className="App"  >
      <header className="App-header container "style={{height:'100vh',backgroundColor:"#EFEFEE"}}>
        <navbar>{md?<NavbarNm/>:<NavbarSm/>}</navbar>
        <Route path="/" exact component={HomePage}></Route>
        <Route path="/Hakkinda" component={Hakkinda}></Route>
        <Route path="/Kayitol" component ={Register}></Route>
        <Route path="/Giris" component={Login}></Route>
      </header>
    </div>
    </Router>
  );
}

export default App;
