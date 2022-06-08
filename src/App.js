import { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import s from "./App.module.css";
import { AllUsers } from "./components/AllUsers/AllUsers";
import Error from "./components/Error/Error";
import Footer from "./components/Footer/Footer";
import Friends from "./components/Friends/Friends";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import NewsContainer from "./components/News/NewsContainer";
import Profile from "./components/Profile/Profile";
import ServerError from "./components/ServerError/ServerError";
import { initialMe } from "./redux/authReducer";

function App(props) {
  useEffect(() => {
    props.initialMe();
  }, []);

  return (
    <>
      {!props.isInit ? (
        <div className={s.initLoading}>
          <h1> ЗАГРУЗКА...</h1>
        </div>
      ) : (
        <div className={s.app}>
          <Header />
          <div className={s.navAndContentDiv}>
            <Navbar isAuth={props.isAuth} />
            <div className={s.content}>
              <Routes>
                <Route path="/users" element={<AllUsers />} />
                <Route path="/friends" element={<Friends />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Profile />} />
                <Route path="/news" element={<NewsContainer />} />
                <Route path="/profile/" element={<Profile />} />
                <Route path="/profile/:id" element={<Profile />} />
                <Route path="/error" element={<Error />} />
                <Route path="/serverError" element={<ServerError />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </div>
          <Footer/>
        </div>
      )}
    </>
  );
}
let mapStateToProps = (state) => {
  return {
    isAuth: state.authPage.isAuth,
    isLoading: state.authPage.isLoading,
    authData: state.authPage.authData,
    isInit: state.authPage.isInit,
  };
};
export default connect(mapStateToProps, { initialMe })(App);
