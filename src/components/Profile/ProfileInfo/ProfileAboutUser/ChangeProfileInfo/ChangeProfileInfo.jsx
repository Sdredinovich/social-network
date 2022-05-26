import React, { useState } from "react";
import s from "./ChangeProfileInfo.module.css";
import vverh from './../../../../../photos/vverh.png'
import vniz from './../../../../../photos/vniz.png'

const ChangeProfileInfo = (props) => {
  const contactKeys = Object.keys(props.profile.contacts);
  const [value, setValue] = useState({
    fullName: props.profile.fullName,
    aboutMe: props.profile.aboutMe,
    userId: props.profile.userId,
    lookingForAJob: props.profile.lookingForAJob,
    lookingForAJobDescription: props.profile.lookingForAJobDescription,
    contacts: props.profile.contacts,
  });
const [openContacts, setOpenContacts] = useState(false)
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
    props.putProfile(value).then((res) => {
      props.changeClick();
    });
  };

  return (
    <div className={s.changeProfileInfo}>
      <form className={s.form}>
        <div className={`${s.fullNameInpDiv} ${s.inpDiv}`}>
          <div className={s.inputAndTitle}>
            <p> Полное имя: </p>
           
            <input
              placeholder="Полное имя"
              onChange={changeHandler}
              onBlur={blurHandler}
              name={"fullName"}
              className={`${s.fullNameInput} `}
              id={`${error.fullName&&s.errorInp}`}
              value={value.fullName}
              title='Обязательное поле'

            />
          
          </div>
        </div>
        <div className={`${s.aboutMeDiv} ${s.inpDiv}`}>
          <div className={s.inputAndTitle}>
            <p> Обо мне: </p>
            <input
              placeholder="Обо мне"
              onChange={changeHandler}
              onBlur={blurHandler}
              name={"aboutMe"}
              className={`${s.aboutMeInput} ${error.aboutMe && s.errorInp}`}
              value={value.aboutMe}
              id={`${error.aboutMe&&s.errorInp}`}
              title='Обязательное поле'
            />

          </div>

        </div>

        <div className={`${s.lookingForAJobDiv} ${s.inpDiv}`}>
          <div className={s.inputAndTitle}>
            <p> Ищу работу: </p>
            <input
              onChange={changeHandler}
              name={"lookingForAJob"}
              id={'lookingForAJob'}
              type={"checkbox"}
              className={s.lookingForAJobInput}
              checked={value.lookingForAJob}
            />
            
            <div className={s.fakeCheckedDiv}>
              {" "}
              <label htmlFor={'lookingForAJob'}
                className={`${s.lookingForAJobInpP} ${
                  value.lookingForAJob && s.active
                }`}
              >
                Да
              </label>
              <label htmlFor={'lookingForAJob'}
                className={`${s.lookingForAJobInpP} ${
                  !value.lookingForAJob && s.active
                }`}
              >
                Нет
              </label>
            </div>
          </div>
        </div>
        {value.lookingForAJob && (
          <div className={`${s.lookingForAJobDescriptionDiv} ${s.inpDiv}`}>
            <div className={s.inputAndTitle}>
              <p>Профессия:</p>
              <input
                placeholder="Желаемая профессия"
                onChange={changeHandler}
                onBlur={blurHandler}
                name={"lookingForAJobDescription"}
                className={s.lookingForAJobDescription}
                value={value.lookingForAJobDescription}
              />
            </div>
          </div>
        )}
        <div className={`${s.contactsDiv} ${s.inpDiv}`}>
          <p className={s.toggleContacts} onClick={()=>{
            setOpenContacts(!openContacts)
          }}>Контакты <img className={s.contactToggleImg} src={openContacts?vverh:vniz}/> </p>
{openContacts&&          <div className={s.contacts}>
          {contactKeys.map((key) => {
            return (
              <div key={key} className={s.contactDiv}>
                <span className={s.contactSpan}>{key}:</span>
                <input
                  onChange={changeHandler}
                  name={key}
                  value={value.contacts[key]}
                />{" "}
              </div>
            );
          })}
          </div>}
        </div>
        <button
          onClick={saveProfile}
          disabled={error.fullName || error.aboutMe}
          className={s.changeInfoBtn}
        >
          <p className={s.changeInfoBtnP}>Сохранить изменения</p>
        </button>
      </form>

      <button onClick={props.changeClick} className={s.changeInfoBtn}>
        <p className={s.changeInfoBtnP}>Отменить редактирование</p>
      </button>
    </div>
  );
};

export default ChangeProfileInfo;
