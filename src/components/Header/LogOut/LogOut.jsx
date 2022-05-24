import React, { useState } from "react";
import s from "./LogOut.module.css";
import anonim from "./../../../photos/anonim.png";
import vpravo from "./../../../photos/vpravo.png";
import { NavLink } from "react-router-dom";

const LogOut = (props) => {
  const toggleBtn = () => {
    setLogOutBtnNone(!logOutBtnNone);
  };

  const [logOutBtnNone, setLogOutBtnNone] = useState(false);

  return (
    <div className={`${s.loginDiv} ${s.loginAuthDiv}`}>
      <div
        className={`${s.logOutBtn} ${logOutBtnNone && s.btnNone}`}
        onClick={() => {
          // props.logOut();
        }}
      >
        <NavLink onClick={()=>{
    setLogOutBtnNone(!logOutBtnNone);

        }} className={s.loginNavlink} to={'./'}>
        <div className={s.aboutMeDiv}>
          <div className={s.headerAvaDiv}>
            <img className={s.headerAvaImg} src={props.photo || anonim} />
          </div>
          <div className={s.aboutMeTitleDiv}>
            <div className={s.fullNameDiv}>
              <p className={s.fullNameP}>{props.fullName}</p>
            </div>

            <div className={s.emailDiv}>
              <span className={s.emailP}>{props.email}</span>
            </div>
          </div>
          <div className={s.vpravoDiv}>
            <img src={vpravo} className={s.vpravoImg} />
          </div>
        </div>
        </NavLink>
        <div className={s.exitDiv} onClick={()=>{
          props.logOut()
        }}>
          <p className={s.exitP}>Выйти</p>

        </div>
      </div>

      <div
        onClick={() => {
          setLogOutBtnNone(!logOutBtnNone);
        }}
        className={s.headerAvaDiv}
      >
        <img className={s.headerAvaImg} src={props.photo || anonim} />
      </div>
    </div>
  );
};

export default LogOut;
