import { useEffect } from "react";
import {  useDispatch, useSelector } from "react-redux";
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
import { initialMe } from "./redux/authReducer";

function App(props) {
 const dispatch = useDispatch()
 const isInit = useSelector(state=>state.authPage.isInit)


  useEffect(() => {
    dispatch(initialMe());
  }, []);

  return (
    <>
      {!isInit ? (
        <div className={s.initLoading}>
          <h1> ЗАГРУЗКА...</h1>
        </div>
      ) : (
        <div className={s.app}>
          <Header />
          <div className={s.navAndContentDiv}>
            <Navbar />
            <div className={s.content}>
              <Routes>
                <Route path="/users" element={<AllUsers />} />
                <Route path="/friends" element={<Friends />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Profile />} />
                <Route path="/news" element={<NewsContainer />} />
                <Route path="/profile/:id" element={<Profile />} />
                <Route path="/error" element={<Error />} />
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

export default App
