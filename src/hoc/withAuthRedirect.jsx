import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
export const WithAuthRedirect = ({children}) => {
  const isAuth = useSelector(state=>state.authPage.isAuth)

  
    if (!isAuth)
      return <Navigate to={"/login"} replace/>;

  return children
};