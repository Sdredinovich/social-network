import React, { useState } from "react";
import ChangeProfileInfo from "./ChangeProfileInfo/ChangeProfileInfo";
import s from "./ProfileAboutUser.module.css";
import vverh from "./../../../../photos/vverh.png";
import vniz from "./../../../../photos/vniz.png";

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
        <ChangeProfileInfo changeClick={changeClick} profile={props.profile} />
      ) : (
        <div className={s.seePrefileInfo}>
          <p className={s.fullName}>{props.profile.fullName}</p>

          <div className={s.titleDiv}>
            <p className={s.titleP}> Статус:</p>
            <p className={s.descriptionP}>{props.profile.status}</p>
          </div>
          <div className={s.titleDiv}>
            <p className={s.titleP}> Обо мне:</p>
            <p className={s.descriptionP}>{props.profile.aboutMe}</p>{" "}
          </div>
          <div className={s.titleDiv}>
            <p className={s.titleP}> ID: </p>
            <p className={s.descriptionP}>{props.profile.userId}</p>
          </div>
          <div className={s.titleDiv}>
            <p className={s.titleP}>Ищу работу: </p>
            <p className={s.descriptionP}>
              {props.profile.lookingForAJob ? "Да" : "Нет"}
            </p>
          </div>
          {props.profile.lookingForAJob && (
            <div className={s.titleDiv}>
              <p className={s.titleP}> Профессия: </p>
              <p className={s.descriptionP}>
                {props.profile.lookingForAJobDescription}
              </p>
            </div>
          )}

          <div className={`${s.contactsDiv}`}>
            <p
              className={s.toggleContacts}
              onClick={() => {
                setOpenContacts(!openContacts);
              }}
            >
              Контакты
            </p>
            <div className={s.contacts}>
              {openContacts &&
                contactKeys.map(
                  (key) =>
                    props.profile.contacts[key] && (
                      <div key={key} className={s.titleDiv}>
                        <p className={s.titleP}> {key}:</p>
                        <p className={s.descriptionP}>
                          <a
                            className={s.contactLink}
                            target={"_blank"}
                            href={`https://www.${props.profile.contacts[key]}`}
                          >
                            {props.profile.contacts[key]}
                          </a>
                        </p>
                      </div>
                    )
                )}
            </div>
          </div>

          {props.isAuth && props.itsMe && (
            <div onClick={changeClick} className={s.changeInfoBtn}>
              Редактировать профиль
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileAboutUser;
