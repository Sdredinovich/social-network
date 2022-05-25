import React, { useState } from "react";
import ChangeProfileInfo from "./ChangeProfileInfo/ChangeProfileInfo";
import s from "./ProfileAboutUser.module.css";

const ProfileAboutUser = (props) => {
  const [change, setChange] = useState(false);
  const [openContacts, setOpenContacts] = useState(false);
  const changeClick = () => {
    setChange(!change);
  };

  const contactKeys = Object.keys(props.profile.contacts);

  return (
    <div className={s.profileAboutUser}>
      {change ? (
        <ChangeProfileInfo
          putProfile={props.putProfile}
          changeClick={changeClick}
          profile={props.profile}
        />
      ) : (

        <div className={s.seePrefileInfo}>
          <div className={`${s.fullNameDiv} ${s.titleDiv}`}>
            <p className={s.fullName}>{props.profile.fullName}</p>
          </div>
          <div className={`${s.statusDiv} ${s.titleDiv}`}>
            <p className={`${s.status} ${s.title}`}>Статус:</p>
            <p>{props.profile.status}</p>
          </div>
          <div className={`${s.aboutMeDiv} ${s.titleDiv} `}>
            <span className={`${s.aboutMe} ${s.title}`}>Обо мне:</span>
            <p>{props.profile.aboutMe}</p>
          </div>
          <div className={`${s.idDiv} ${s.titleDiv}`}>
            <p className={`${s.id} ${s.title}`}>
             ID:
            </p><p>{props.profile.userId}</p>
          </div>
          <div className={`${s.lookingForAJobDiv} ${s.titleDiv}`}>
            <p className={`${s.lookingForAJob } ${s.title}`}>Ищу работу:</p>
            <p>{props.profile.lookingForAJob ? "Да" : "Нет"}</p>
          </div>
          {props.profile.lookingForAJob && (
            <div className={`${s.lookingForAJobDescriptionDiv} ${s.titleDiv}`}>
              <p className={`${s.lookingForAJobDescription } ${s.title}`}>
                Профессия:
              </p><p> {props.profile.lookingForAJobDescription}</p>
            </div>
          )}
          <div className={`${s.contactsDiv}`}>
          <p className={s.toggleContacts} onClick={()=>{
            setOpenContacts(!openContacts)
          }}>Контакты {openContacts?'⮝':'⮟'} </p>
<div className={s.contacts}>
            {openContacts&&contactKeys.map(
              (key) =>
                props.profile.contacts[key] && (
                  <div key={key} className={`${s.contactDiv}`}>
                    <span className={s.contactSpan}>{key}:</span>{" "}
                    <a
                      className={s.contactLink}
                      target={"_blank"}
                      href={`https://www.${props.profile.contacts[key]}`}
                    >
                      {props.profile.contacts[key]}
                    </a>
                  </div>
                )
            )}
            </div>
          </div>
          {props.isAuth && props.itsMe && (
            <div onClick={changeClick} className={s.changeInfoBtnDiv}>
              <p className={s.changeInfoBtnP}>Редактировать профиль</p>
            </div>
          )}
        </div>








      )}
    </div>
  );
};

export default ProfileAboutUser;
