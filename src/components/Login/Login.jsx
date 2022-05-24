import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import s from "./Login.module.css";

const Login = (props) => {
  const [value, setValue] = useState({
    email: "",
    password: "",
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
        setValue({ ...value, email: e.target.value });
        setServerError("");
        var re = /\S+@\S+\.\S+/;
        if (!re.test(e.target.value)) {
          setError({ ...error, email: "Емэйл некорректен" });
        } else {
          setError({ ...error, email: "" });
        }
        break;
      case "password":
        setValue({ ...value, password: e.target.value });

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
          console.log(value);
          setValue({ ...value, rememberMe: e.target.checked });
          break;
      
   
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
    }
  };
  const loginSubmit = (e) => {
    e.preventDefault();
    props.login(value).then((res) => {
      if (res === 1) {
        setServerError("Неверный пароль или логин");
      }
    });
  };

  if (props.isAuth) {
    return <Navigate to={"/profile"} />;
  }
  return (
    <div className={s.login}>
      <div className={s.loginDiv}>
        <form className={s.loginForm}>
          <h2>АВТОРИЗАЦИЯ</h2>
          <div className={s.inpDiv}>
            {dirty.email && error.email && <p className={s.errorLoginP}>!</p>}

            <input
              onChange={(e) => inpHundler(e)}
              value={value.email}
              onBlur={(e) => blurHandler(e)}
              name="email"
              placeholder="Введите логин"
              className={`${s.inp} ${dirty.email && error.email && s.errorRed}`}
            />
            {dirty.email && error.email && (
              <p className={s.passwordTitle}>{error.email}</p>
            )}
          </div>
          <div className={s.inpDiv}>
            {dirty.password && error.password && (
              <p className={s.errorPasswordP}>!</p>
            )}
            <input
              onChange={(e) => inpHundler(e)}
              value={value.password}
              onBlur={(e) => blurHandler(e)}
              name="password"
              placeholder="Введите пароль"
              className={`${s.inp} ${
                dirty.password && error.password && s.errorRed
              }`}
            />
            {dirty.password && error.password && (
              <p className={s.passwordTitle}>{error.password}</p>
            )}

<div className={s.rememberMeDiv}>
            <span>Запомнить меня</span>{" "}
            <input
              type={"checkbox"}
              onChange={(e) => inpHundler(e)}
              value={value.rememberMe}
              onBlur={(e) => blurHandler(e)}
              name="rememberMe"
              className={`${s.inp} ${s.checkbox }`}
            />
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
