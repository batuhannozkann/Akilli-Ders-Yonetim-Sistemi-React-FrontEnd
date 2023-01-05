import React, { useState } from "react";
import {useDispatch,useSelector} from "react-redux";
import {logout} from "../stores/auth"
import { Link } from "react-router-dom";
const NavbarNm = (props) =>{
    const auth = useSelector((state)=>state.auth.user);
    const users = useSelector((state)=>state.auth)
    console.log(users);
    const dispatch = useDispatch();
    const [active,setActive] = useState("");
    const activeItem = "item active";
    const normalItem = "item";
    return(
    <div className="ui inverted segment">
    <div className="ui inverted secondary pointing menu">
    <div className="item">
      <img style={{width: '60px', height: 'auto',marginRight:40}}src="adyslogo1.png"></img>
    </div>
      <Link to="/" onClick={()=>setActive("Home")} className={active=="Home"?activeItem:normalItem}>
        Anasayfa
      </Link>
      <Link onClick={()=>setActive("Messages")} className={active=="Messages"?activeItem:normalItem}>
        Açık Ders Kütüphanesi
      </Link>
      <Link to="/Hakkinda" onClick={()=>setActive("Friends")} className={active=="Friends"?activeItem:normalItem}>
        Hakkında
      </Link>
      {auth?<Link onClick={()=>setActive("Lessons")} className={active=="Lessons"?activeItem:normalItem}>Derslerim</Link>:""}
      <div className="right menu">
      {auth?<>
      <div className="item active" style={{marginBottom:10}}>{users.userProps.firstName +" "+ users.userProps.lastName}</div>
      <Link onClick={()=>dispatch(logout())}  className="item"><p className="ui primary button">Logout</p></Link></>
      :
      <>
      <Link to="/Giris" className="item"><p className="ui primary button">Giriş Yap</p></Link>
      <Link to="/Kayitol" className="item"><p className="ui primary button">Kayıt Ol</p></Link>
      </>}
      </div>
    </div>
  </div>);
};
export default NavbarNm;