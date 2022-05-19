import s from "./Header.module.css";
import React, { useState } from "react";
import Search from "../Serach/Search";
import popup from "../../photos/popup.svg";
import home from "../../photos/home.svg";
import { NavLink } from "react-router-dom";
import  LogOut  from "./LogOut/LogOut";
import HeaderNavbar from "./HeaderNavbar";

const Header = (props) => {

  const [active, setActive] = useState(false)
  return (
    <div className={s.header}>
      <div className={s.popupDiv}>
        <div onClick={()=>{
          setActive(!active)
        }} className={`${s.popupDiv2} ${active&&s.navbarActive}`}>
        <img className={s.popupImg} src={popup} />
<HeaderNavbar/>
        </div>
      </div>
      <div className={s.logoAndSearch}>
        <NavLink to="/" className={s.logoDiv}>
          <img className={s.homeImg} src={home} />
        </NavLink>
      </div>
      {props.isAuth ? (
        <LogOut email={props.email} login={props.login} fullName={props.myProfile.fullName} photo={props.myProfile.photos.large} logOut={props.logOut} />
      ) : (
        <div className={s.loginDiv}>
          <NavLink className={s.loginNav} to={"/login"}>
            <span>Войти</span>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Header;
