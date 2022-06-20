import s from "./Navbar.module.css";

import React from "react";

import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
const setStyle = ({ isActive }) => ({ color: isActive ? "white" : "" })

const Navbar = (props) => {
const isAuth = useSelector(state=>state.authPage.isAuth)

  return <div className={s.navbar}>
   
  {isAuth&&<div className={s.navDiv}><NavLink to="/" style={setStyle}  className={s.nav }>Моя страница</NavLink></div>}

  {isAuth&&<div className={s.navDiv}><NavLink to="/friends" style={setStyle} className={s.nav }>Друзья</NavLink></div>}
  <div className={s.navDiv}><NavLink    to="/users" style={setStyle}  className={s.nav }>Пользователи</NavLink></div>
  <div className={s.navDiv}><NavLink    to="/news" style={setStyle} className={s.nav }>Новости</NavLink></div>

  </div>;
};
export default Navbar;
