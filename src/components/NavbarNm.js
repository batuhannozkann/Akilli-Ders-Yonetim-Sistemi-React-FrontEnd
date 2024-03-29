import React, { useState} from "react";
import {useDispatch,useSelector} from "react-redux";
import {logout} from "../stores/auth";
import {location} from "../stores/todo";
import { Link,useLocation } from "react-router-dom";
import {Dropdown} from "semantic-ui-react";
const NavbarNm = (props) =>{
    const auth = useSelector((state)=>state.auth.user);
    const users = useSelector((state)=>state.auth)
    const locationState = useLocation();
    const dispatch = useDispatch();
    dispatch(location(locationState.pathname));
    const [active,setActive] = useState("");
    const activeItem = "item active container";
    const normalItem = "item container";
    const [roles,setRoles] = useState([]);
    const item=(JSON.parse(sessionStorage.getItem("decodeToken")));
    console.log(users);
    return(
      <div className="container">
    <div className="ui inverted segment container-fluid" style={{margin:0}}>
    <div className="ui inverted secondary pointing menu">
    <div className="item">
      <img style={{width: '60px', height: 'auto',marginRight:40}}src="adyslogo1.png"></img>
    </div>
      <Link to="/" onClick={()=>setActive("Home")} className={active=="Home"?activeItem:normalItem}>
        Anasayfa
      </Link>
      <Link to="/Dersler"onClick={()=>setActive("Messages")} className={active=="Messages"?activeItem:normalItem}>
        Açık Ders Kütüphanesi
      </Link>
      {auth?<Link to="/Derslerim" onClick={()=>setActive("Lessons")} className={active=="Lessons"?activeItem:normalItem}>Derslerim</Link>:""}
      {users.roleList.includes("admin")&&auth? <Dropdown
           text='Admin'
            icon='edit'
            floating
            button
            labeled
            className='item icon'
  >
    <Dropdown.Menu>
      <Dropdown.Header icon='edit' content='Panel' />
      <Dropdown.Item>
        <Link style={{backgroundColor:"black"}} to="/Kullanicilar"onClick={()=>setActive("User")} className={active=="User"?activeItem:normalItem}>
        Kullanıcı Paneli
      </Link></Dropdown.Item>
      <Dropdown.Item><Link style={{backgroundColor:"black"}} to="/DersDuzenle"onClick={()=>setActive("Lesson")} className={active=="Lesson"?activeItem:normalItem}>
        Ders Paneli
      </Link></Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>:""}
      <div className="right menu container-fluid">
      {auth?<>
      <Link style={{marginTop:10}} to="/Bilgilerim"><div className="item active" style={{marginBottom:10}}>{users.userProps.firstName +" "+ users.userProps.lastName}</div></Link>
      <Link to="/" onClick={()=>dispatch(logout())}  className="item"><p className="ui primary button">Çıkış Yap</p></Link></>
      :
      <>
      <Link to="/Giris" className="item"><p className="ui primary button">Giriş Yap</p></Link>
      <Link to="/Kayitol" className="item"><p className="ui primary button">Kayıt Ol</p></Link>
      </>}
      </div>
    </div>
  </div>
  </div>);
};
export default NavbarNm;