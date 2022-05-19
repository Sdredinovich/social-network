import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router";
export const WithAuthRedirect = (Component) => {

    let wrapper = (props) => {
    if (!props.isAuth)
      return <Navigate to={"/login"} replace/>;
    return <Component {...props} />;
  };

  let mapStateToProps = (state)=>({
      isAuth: state.authPage.isAuth,
  })

  return connect(mapStateToProps)(wrapper)
};