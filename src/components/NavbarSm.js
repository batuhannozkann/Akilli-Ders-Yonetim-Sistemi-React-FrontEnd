import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from 'react-responsive'
import { Menu, MenuItem, Sidebar } from 'semantic-ui-react'
import { useSelector,useDispatch } from "react-redux";
import {logout} from "../stores/auth"

const NavbarSm = (props)=>{
    const auth = useSelector((state)=>state.auth.user);
    const users = useSelector((state)=>state.auth)
    const dispatch = useDispatch();
    const handleItemClick = (e, { name }) => setactiveItem(name)
    const [visible, setVisible] = useState(false)
    const [icon, setIcon] = useState(HamIcon)
    const [activeItem, setactiveItem] = useState("Anasayfa")
    const hideSidebar = () => {
        setIcon(HamIcon)
        setVisible(false)
      }
    const showSidebar = () => {
        setIcon(CloseIcon)
        setVisible(true)
      }
      const toggleSidebar = () => {
        visible ? hideSidebar() : showSidebar()
      }
      function HamIcon() {
        return (<i className="big bars icon inverted" />)
      }
      function CloseIcon() {
        return (<i className="big close red icon" />)
      }
    return(
        <><Menu inverted
            size="tiny"
            borderless
            attached
        >
            <Menu.Item>
                <img src="adyslogo1.png" width="200px" height="35px"  alt="" />
            </Menu.Item>
            <Menu.Menu position='right'>
                <Menu.Item onClick={toggleSidebar}>
                    {icon}
                </Menu.Item>
            </Menu.Menu>
        </Menu><Sidebar as={Menu}
            animation='overlay'
            icon='labeled'
            inverted
            vertical
            visible={visible}
            width='thin'
        >
                <Menu.Item>
                    <img src="adyslogo1.png" width="" height="" style={{ margin: "0 auto" }} alt="" />
                </Menu.Item>
                <Menu.Item
                name={users.userProps.firstName +" "+ users.userProps.lastName}
                />
                <Menu.Item
                    as={Link}
                    to='/'
                    name='Anasayfa'
                    active={activeItem === 'Anasayfa'}
                    onClick={handleItemClick} />
                <Menu.Item
                    as={Link}
                    to="/"
                    name='Açık Ders Kütüphanesi'
                    active={activeItem === 'Açık Ders Kütüphanesi'}
                    onClick={handleItemClick} />
                {auth?<Menu.Item
                        as={Link}
                        name="Çıkış Yap"
                        to="/"
                        onClick={()=>dispatch(logout())}
                        />:<><Menu.Item
                    as={Link}
                    to="/Giris"
                    name='Giriş Yap'
                    active={activeItem === 'Giriş Yap'}
                    onClick={handleItemClick}
                    position="right" /><Menu.Item
                        as={Link}
                        to="/Kayitol"
                        name='Kayıt Ol'
                        active={activeItem === 'Kayıt Ol'}
                        onClick={handleItemClick} /></>
                        }
            </Sidebar></>
        )
    
      
}
export default NavbarSm;