import s from "./Header.module.css";
import React, { useState } from "react";
import popup from "../../photos/popup.png";
import home from "../../photos/home.png";
import { NavLink } from "react-router-dom";
import  LogOut  from "./LogOut/LogOut";
import HeaderNavbar from "./HeaderNavbar";
import { useSelector } from "react-redux";

const Header = (props) => {

  const isAuth = useSelector(state => state.authPage.isAuth)

  const [active, setActive] = useState(false)
  return (
    <div className={s.header}>
      <div className={s.popupDiv}>
        <div onClick={()=>{
          setActive(!active)
        }} className={`${s.popupDiv2} ${active&&isAuth&&s.navbarActive} ${active&&!isAuth&&s.navbarActive2}`}>
        <img className={s.popupImg} src={popup} />
<HeaderNavbar 
      isAuth={isAuth}

/>
        </div>
      </div>
      <div className={s.logoAndSearch}>
        <NavLink to="/" className={s.logoDiv}>
          <img className={s.homeImg} src={home} />
        </NavLink>
      </div>
      {isAuth ? (
        <LogOut  />
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
