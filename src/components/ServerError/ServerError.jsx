import React from "react";
import s from './ServerError.module.css'



const ServerError = (props)=>{
    return <div className={s.error}>
    <h1>Серверная ошибка</h1>
    <h3>Веруться на главную</h3>

    </div>
}


export default ServerError