import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import { login } from "../../redux/authReducer";
import s from "./Login.module.css";

const Login = (props) => {
  const dispatch = useDispatch()
  const isAuth = useSelector(state=>state.authPage.isAuth)
  const [formValue, setFormValue] = useState({
    email: "sedredinovich@gmail.com",
    password: "saashdSo12_",
    rememberMe: false,
  });
  const [error, setError] = useState({
    email: "Емэйл не может быть пустым",
    password: "Пароль не может быть пустым",
  });
  const [dirty, setDirty] = useState({
    email: false,
    password: false,
  });
  const [serverError, setServerError] = useState("");
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (error.email || error.password) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [error]);

  const inpHundler = (e) => {
    switch (e.target.name) {
      case "email":
        setFormValue({ ...formValue, email: e.target.value });
        setServerError("");
        var re = /\S+@\S+\.\S+/;
        if (!re.test(e.target.value)) {
          setError({ ...error, email: "Емэйл некорректен" });
        } else {
          setError({ ...error, email: "" });
        }
        break;
      case "password":
        setFormValue({ ...formValue, password: e.target.value });

        setServerError("");

        if (e.target.value.length < 4 || e.target.value.length > 12) {
          setError({
            ...error,
            password: "Пароль должен содержать от 4 до 12 символов",
          });
        } else {
          setError({ ...error, password: "" });
        }
        break;
        case "rememberMe":
          setFormValue({ ...formValue, rememberMe: e.target.checked });
          break;

          default: 
          break
      
   
      }
  };

  const blurHandler = (e) => {
    switch (e.target.name) {
      case "email":
        setDirty({ ...dirty, email: true });
        break;
      case "password":
        setDirty({ ...dirty, password: true });
        break;
        default: 
        break
    }
  }
  
  const loginSubmit = async (e) => {
    console.log(formValue)
    e.preventDefault();
    const res = await dispatch(login(formValue))
    if (res === 1) {
      setServerError("Неверный пароль или логин");
    }
   };

  if (isAuth) {
    return <Navigate to={"/profile"} />;
  }
  return (
    <div className={s.login}>
      <div className={s.loginDiv}>
        <form className={s.loginForm}>
          <h2 className={s.title}>АВТОРИЗАЦИЯ</h2>
          <span>Пробный аккаунт</span><br/>
          <div className={s.inpDiv}>
            {dirty.email && error.email && <p title={error.email} className={s.errorP}>!</p>}

            <input
              onChange={(e) => inpHundler(e)}
              value={formValue.email}
              onBlur={(e) => blurHandler(e)}
              name="email"
              placeholder="Введите логин"
              className={`${s.inp} ${dirty.email && error.email && s.errorRed}`}
            />

          </div>
          <div className={s.inpDiv}>
            {dirty.password && error.password && (
              <p title={error.password} className={s.errorP}>!</p>
            )}
            <input
              onChange={(e) => inpHundler(e)}
              value={formValue.password}
              onBlur={(e) => blurHandler(e)}
              name="password"
              placeholder="Введите пароль"
              className={`${s.inp} ${
                dirty.password && error.password && s.errorRed
              }`}
            />
      

<div className={s.rememberMeDiv}>
            <span>Запомнить меня</span>{" "}
            <input
              type={"checkbox"}
              onChange={(e) => inpHundler(e)}
              value={formValue.rememberMe}
              onBlur={(e) => blurHandler(e)}
              name="rememberMe"
              id="rememberMe"
              className={`${s.inp} ${s.checkbox }`}
            />
            <div className={s.checkboxToggle}>
<label htmlFor='rememberMe' className={`${s.checkboxP} ${formValue.rememberMe&&s.active}`}>Да</label>
<label htmlFor='rememberMe' className={`${s.checkboxP} ${!formValue.rememberMe&&s.active}`}>Нет</label>
</div>
</div>


          </div>
          {/* <div className={s.captchaDiv}>
            <img alt="captcha" className={s.captchaImg} />
          </div> */}
          <button
            onClick={(e) => {
              loginSubmit(e);
            }}
            disabled={!formValid}
            className={s.btn}
          >
            ВОЙТИ
          </button>
        </form>
        {serverError && (
          <div className={s.serverErrordiv}>
            <p className={s.serverErrorP}>{serverError}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
