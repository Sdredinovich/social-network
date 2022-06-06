import React, { useState } from "react";
import s from "./LogOut.module.css";
import anonim from "./../../../photos/anonim.png";
import vpravo from "./../../../photos/vpravo.png";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../../redux/authReducer";

const LogOut = (props) => {
  const dispatch = useDispatch()
  const login = useSelector(state => state.authPage.authData.login)
  const email = useSelector(state => state.authPage.authData.email)
  const myProfile = useSelector(state => state.authPage.myProfile)
  const toggleBtn = () => {
    setLogOutBtnNone(!logOutBtnNone);
  };

  const [logOutBtnNone, setLogOutBtnNone] = useState(false);

  return (
    <div className={`${s.loginDiv} ${s.loginAuthDiv}`}>
      <div
        className={`${s.logOutBtn} ${logOutBtnNone && s.btnNone}`}
     
      >
        <NavLink onClick={toggleBtn} className={s.loginNavlink} to={'./'}>
        <div className={s.aboutMeDiv}>
          <div className={s.headerAvaDiv}>
            <img className={s.headerAvaImg} src={myProfile.photos.small || anonim} />
          </div>
          <div className={s.aboutMeTitleDiv}>
            <div className={s.fullNameDiv}>
              <p className={s.fullNameP}>{login}</p>
            </div>

            <div className={s.emailDiv}>
              <span className={s.emailP}>{email}</span>
            </div>
          </div>
          <div className={s.vpravoDiv}>
            <img src={vpravo} className={s.vpravoImg} />
          </div>
        </div>
        </NavLink>
        <div className={s.exitDiv} onClick={()=>{
          dispatch(logOut())
        }}>
          <p className={s.exitP}>Выйти</p>

        </div>
      </div>

      <div
        onClick={toggleBtn}
        className={s.headerAvaDiv}
      >
        <img className={s.headerAvaImg} src={myProfile.photos.small || anonim} />
      </div>
    </div>
  );
};

export default LogOut;
