import React from "react";
import s from "./Users.module.css";
import Paginator from "../Paginator/Paginator";
import Search from "../Serach/Search";
import { User } from "./User/User";

const Users = (props) => {
  
  return (
    <div className={s.usersDiv}>
      <Search
        term={props.term}
        placeholder={"Поиск пользователей"}
        setTerm={props.setTerm}
      />
      <Paginator
        page={props.page}
        setPage={props.setPage}
        totalCount={props.totalCount}
        count={props.count}
      />
      {props.isLoading ? (
        <h1>Загрузка...</h1>
      ) : (
        <>
          {props.users.length < 1 && <h1>Пользователей нет</h1>}
          <div className={s.users}>
            {props.users.map((user) => {
              return (
                <User
                  follow={props.follow}
                  unFollow={props.unFollow}
                  key={user.id}
                  user={user}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Users;
