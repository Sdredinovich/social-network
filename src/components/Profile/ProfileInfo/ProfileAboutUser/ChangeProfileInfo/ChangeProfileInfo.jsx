import React, { useState } from "react";
import s from "./ChangeProfileInfo.module.css";
import { useDispatch } from "react-redux";
import { putProfile } from "../../../../../redux/profileReducer";

const ChangeProfileInfo = (props) => {
  const dispatch = useDispatch()
  const contactKeys = Object.keys(props.profile.contacts);
  const [value, setValue] = useState({
    fullName: props.profile.fullName,
    aboutMe: props.profile.aboutMe,
    userId: props.profile.userId,
    lookingForAJob: props.profile.lookingForAJob,
    lookingForAJobDescription: props.profile.lookingForAJobDescription,
    contacts: props.profile.contacts,
  });
  const [error, setError] = useState({
    fullName: "",
    userId: "",
  });
  const [dirty, setDirty] = useState({
    fullName: false,
    userId: false,
  });

  const blurHandler = (e) => {
    setDirty({ ...dirty, [e.target.name]: true });
  };
  const changeHandler = (e) => {
    switch (e.target.name) {
      case "fullName":
        if (e.target.value.length < 1) {
          setError({ ...error, fullName: "Обязательное поле" });
        } else {
          setError({ ...error, fullName: "" });
        }
        setValue({ ...value, [e.target.name]: e.target.value });

        break;
        case "aboutMe":
          if (e.target.value.length < 1) {
            setError({ ...error, aboutMe: "Обязательное поле" });
          } else {
            setError({ ...error, aboutMe: "" });
          }
          setValue({ ...value, [e.target.name]: e.target.value });
  
          break;
      case "lookingForAJob": {
        setValue({ ...value, [e.target.name]: e.target.checked });
        break;
      }
      case "facebook": {
        setValue({
          ...value,
          contacts: { ...value.contacts, [e.target.name]: e.target.value },
        });
        break;
      }
      case "vk": {
        setValue({
          ...value,
          contacts: { ...value.contacts, [e.target.name]: e.target.value },
        });
        break;
      }
      case "website": {
        setValue({
          ...value,
          contacts: { ...value.contacts, [e.target.name]: e.target.value },
        });
        break;
      }
      case "twitter": {
        setValue({
          ...value,
          contacts: { ...value.contacts, [e.target.name]: e.target.value },
        });
        break;
      }
      case "instagram": {
        setValue({
          ...value,
          contacts: { ...value.contacts, [e.target.name]: e.target.value },
        });
        break;
      }
      case "youtube": {
        setValue({
          ...value,
          contacts: { ...value.contacts, [e.target.name]: e.target.value },
        });
        break;
      }
      case "github": {
        setValue({
          ...value,
          contacts: { ...value.contacts, [e.target.name]: e.target.value },
        });
        break;
      }
      case "mainLink": {
        setValue({
          ...value,
          contacts: { ...value.contacts, [e.target.name]: e.target.value },
        });
        break;
      }

      default:
        setValue({ ...value, [e.target.name]: e.target.value });
    }
  };

  const saveProfile = (e) => {
    e.preventDefault();
    dispatch(putProfile(value)).then((res) => {
      props.changeClick();
    });
  };

  return (
    <div className={s.changeProfileInfo}>
      <form className={s.form}>
        <div className={`${s.inpDiv}`}>
            <p className={s.inpP}> Полное имя: </p>
           
            <input
              placeholder="Полное имя"
              onChange={changeHandler}
              onBlur={blurHandler}
              name={"fullName"}
              className={`${s.inp} `}
              id={`${error.fullName&&s.errorInp}`}
              value={value.fullName}
              title='Обязательное поле'

            />
          
        </div>
        <div className={`${s.inpDiv}`}>
            <p className={s.inpP}> Обо мне: </p>
            <input
              placeholder="Обо мне"
              onChange={changeHandler}
              onBlur={blurHandler}
              name={"aboutMe"}
              className={`${s.inp} ${error.aboutMe && s.errorInp}`}
              value={value.aboutMe}
              id={`${error.aboutMe&&s.errorInp}`}
              title='Обязательное поле'
            />


        </div>

        <div className={`${s.inpDiv}`}>
            <p className={s.inpP}> Ищу работу: </p>
            <input
              onChange={changeHandler}
              name={"lookingForAJob"}
              id={'lookingForAJob'}
              type={"checkbox"}
              className={`${s.inp} ${s.lookingForAJobInput}`}
              checked={value.lookingForAJob}
            />
            
            <div className={s.fakeCheckedDiv}>
              {" "}
              <label htmlFor={'lookingForAJob'}
                className={`${s.lookingForAJobInpLbl} ${
                  value.lookingForAJob && s.active
                }`}
              >
                Да
              </label>
              <label htmlFor={'lookingForAJob'}
                className={`${s.lookingForAJobInpLbl} ${
                  !value.lookingForAJob && s.active
                }`}
              >
                Нет
              </label>
            </div>
        </div>
        {value.lookingForAJob && (
          <div className={`${s.inpDiv}`}>
              <p className={s.inpP}>Профессия:</p>
              <input
                placeholder="Желаемая профессия"
                onChange={changeHandler}
                onBlur={blurHandler}
                name={"lookingForAJobDescription"}
                className={s.inp}
                value={value.lookingForAJobDescription}
              />
          </div>
        )}
        <div className={`${s.contactsDiv}`}>
                 
          
<div className={s.contacts}>
          {contactKeys.map((key) => {
            return (
              <div key={key} className={s.inpDiv}>
                <p className={s.inpP}>{key}:</p>
                <input
                className={s.inp}
                  onChange={changeHandler}
                  name={key}
                  value={value.contacts[key]}
                />{" "}
              </div>
            );
          })}
          </div>
        </div>
        <button
          onClick={saveProfile}
          disabled={error.fullName || error.aboutMe}
          className={s.changeInfoBtn}
        >Сохранить изменения
        </button>
      </form>

      <button onClick={props.changeClick} className={s.changeInfoBtn}>Отменить редактирование
      </button>
    </div>
  );
};

export default ChangeProfileInfo;
