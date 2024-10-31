import s from "./Header.module.css";
import React from "react";
import homepage from "./../../photos/home2.png";
import { Link } from "react-router-dom";
import LogOut from "./LogOut/LogOut";
import HeaderNavbar from "./HeaderNavbar";
import { useSelector } from "react-redux";



const Header = (props) => {

  const isAuth = useSelector((state) => state.authPage.isAuth);

  return (
    <div className={s.header}>

          <HeaderNavbar isAuth={isAuth} />



        <Link to="/" className={s.logoDiv}>
          <img className={s.homeImg} src={homepage} />
        </Link>
      {isAuth ? (
        <LogOut />
      ) : (
          <Link className={s.loginNav} to={"/login"}>
            <span>Войти</span>
          </Link>
      )}
    </div>
  );
};

export default Header;
