import React from "react";
import { connect } from "react-redux";
import { login } from "../../redux/authReducer";
import Login from "./Login";


const LoginContainer = (props)=>{
    return <Login captcha={props.captcha} login={props.login} isAuth={props.isAuth}/>
}

const mapStateToProps = (state)=>{
    return {
        isAuth: state.authPage.isAuth,
        captcha: state.authPage.captcha
    }
}
export default connect(mapStateToProps,{login})(LoginContainer)