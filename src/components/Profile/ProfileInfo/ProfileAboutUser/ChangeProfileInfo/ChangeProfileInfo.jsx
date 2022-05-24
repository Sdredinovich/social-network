import React, { useState } from "react";
import s from "./ChangeProfileInfo.module.css";

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
          setError({ ...error, fullName: "Это поле не может быть пустым" });
        } else {
          setError({ ...error, fullName: "" });
        }
        setValue({ ...value, [e.target.name]: e.target.value });

        break;
      case "userId":
        if (e.target.value.length < 1) {
          setError({ ...error, userId: "Это поле не может быть пустым" });
        } else {
          setError({ ...error, userId: "" });
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
              className={s.fullNameInput}
              value={value.fullName}
            />
          </div>
          {error.fullName && <p className={s.errorP}>{error.fullName}</p>}
        </div>
        <div className={`${s.aboutMeDiv} ${s.inpDiv}`}>
          <div className={s.inputAndTitle}>
            <p> Обо мне: </p>
            <input
              placeholder="Обо мне"
              onChange={changeHandler}
              onBlur={blurHandler}
              name={"aboutMe"}
              className={s.aboutMeInput}
              value={value.aboutMe}
            />
          </div>
        </div>
        <div className={`${s.idDiv} ${s.inpDiv}`}>
          <div className={s.inputAndTitle}>
            <p> ID: </p>
            <input
              placeholder="Пользовательский ID"
              onBlur={blurHandler}
              onChange={changeHandler}
              name={"userId"}
              type={"number"}
              className={s.idInput}
              value={value.userId}
              readOnly={true}
            />
          </div>
          {error.userId && <p className={s.errorP}>{error.userId}</p>}
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
              <label for={'lookingForAJob'}
                className={`${s.lookingForAJobInpP} ${
                  value.lookingForAJob && s.active
                }`}
              >
                Да
              </label>
              <label for={'lookingForAJob'}
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
          }}>Контакты {openContacts?'⮝':'⮟'} </p>
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
          disabled={error.fullName || error.userId}
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
