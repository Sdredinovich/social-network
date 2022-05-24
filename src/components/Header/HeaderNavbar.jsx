import React from "react";
import s from "./Header.module.css";
import users from "./../../photos/users.png";
import friends from "./../../photos/friends.png";
import homepage from "./../../photos/home2.png";
import news from "./../../photos/news.png";
import { NavLink } from "react-router-dom";

const HeaderNavbar = (props) => {
  return (
    <div className={s.headerNavbar}>
      <NavLink
        className={(navData) => (navData.isActive ? s.active : s.nav)}
        to={"/"}
      >
        {" "}
        <div title={"Главная"} className={s.navDiv}>
          <img src={homepage} className={s.navImg} />
        </div>
      </NavLink>
      <NavLink
        className={(navData) => (navData.isActive ? s.active : s.nav)}
        to={"/news"}
      >
        {" "}
        <div title={"Новости"} className={s.navDiv}>
          <img src={news} className={s.navImg} />
        </div>
      </NavLink>
      {props.isAuth && (
        <NavLink
          className={(navData) => (navData.isActive ? s.active : s.nav)}
          to={"/friends"}
        >
          {" "}
          <div title={"Друзья"} className={s.navDiv}>
            <img src={friends} className={s.navImg} />
          </div>
        </NavLink>
      )}
      <NavLink
        className={(navData) => (navData.isActive ? s.active : s.nav)}
        to={"/users"}
      >
        {" "}
        <div title={"Пользователи"} className={s.navDiv}>
          <img src={users} className={s.navImg} />
        </div>
      </NavLink>
    </div>
  );
};

export default HeaderNavbar;
