import React from "react";
import s from "./Header.module.css";
import users from "./../../photos/users.png";
import friends from "./../../photos/friends.png";
import homepage from "./../../photos/home2.png";
import news from "./../../photos/news.png";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";

const HeaderNavbar = (props) => {
  const {pathname} = useLocation()
 
  const activeClass = ()=>{
    const location = pathname.slice(1)
    if(location=='login'){
      return s.line1
    }
if(location=='users'){
  return s.line4
}
if(location=='friends'){
  return s.line3
}
if(location=='news'){
  return s.line2
}
if(location==''){
  return s.line1
}
  }


  return (
    <div className={s.headerNavbar}>
      <NavLink
      title={"Главная"}
        className={s.nav}
        to={"/"}
      >
        {" "}
          <img src={homepage} className={s.navImg} />

      </NavLink>
      <NavLink title={"Новости"} 
        className={s.nav}
        to={"/news"}
      >
        {" "}
          <img src={news} className={s.navImg} />
      </NavLink>
        <NavLink title={"Друзья"}
          className={s.nav}
          to={"/friends"}
        >
          {" "}
            <img src={friends} className={s.navImg} />
        </NavLink>
      <NavLink title={"Пользователи"} 
        className={s.nav}
        to={"/users"}
      >
        {" "}
          <img src={users} className={s.navImg} />
      </NavLink>
      <div className={`${s.lineDiv} ${activeClass()}`}></div>
    </div>
  );
};

export default HeaderNavbar;
