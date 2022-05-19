import s from "./Navbar.module.css";

import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = (props) => {
  return <div className={s.navbar}>
  
  {props.isAuth&&<div className={s.navDiv}><NavLink to="/profile"  className={(navData) => navData.isActive ? s.active: s.nav }>Моя страница</NavLink></div>}

  {props.isAuth&&<div className={s.navDiv}><NavLink to="/friends" className={(navData) => navData.isActive ? s.active: s.nav }>Друзья</NavLink></div>}
  <div className={s.navDiv}><NavLink    to="/users" className={(navData) => navData.isActive ? s.active: s.nav }>Пользователи</NavLink></div>
  <div className={s.navDiv}><NavLink    to="/news" className={(navData) => navData.isActive ? s.active: s.nav }>Новости</NavLink></div>

  </div>;
};
export default Navbar;
