import React from "react";
import { connect } from "react-redux";
import { logOut } from "../../redux/authReducer";
import Header from "./Header";

const HeaderContainer = (props) => {
  return (
    <Header
      isAuth={props.isAuth}
      login={props.authData.login}
      email={props.authData.email}
      logOut={props.logOut}
      myProfile={props.myProfile}
    />
  );
};
let mapStateToProps = (state) => {
  return {
    isAuth: state.authPage.isAuth,
    authData: state.authPage.authData,
    myProfile: state.authPage.myProfile
  };
};

export default connect(mapStateToProps, { logOut })(HeaderContainer);
