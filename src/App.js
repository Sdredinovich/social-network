import axios from "axios";
import { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import s from "./App.module.css";
import Error from "./components/Error/Error";
import Footer from "./components/Footer/Footer";
import FriendsContainer from "./components/Friends/FriendsContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginContainer from "./components/Login/LoginContainer";
import Navbar from "./components/Navbar/Navbar";
import NewsContainer from "./components/News/NewsContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import ServerError from "./components/ServerError/ServerError";
import UsersContainer from "./components/Users/UsersContainer";
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
          <HeaderContainer />
          <div className={s.navAndContentDiv}>
            <Navbar isAuth={props.isAuth} />
            <div className={s.content}>
              <Routes>
                <Route path="/users" element={<UsersContainer />} />
                <Route path="/friends" element={<FriendsContainer />} />
                <Route path="/login" element={<LoginContainer />} />
                <Route path="/" element={<ProfileContainer />} />
                <Route path="/news" element={<NewsContainer />} />
                <Route path="/profile/" element={<ProfileContainer />} />
                <Route path="/profile/:id" element={<ProfileContainer />} />
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
