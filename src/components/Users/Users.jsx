import React, { useState } from "react";
import s from "./Users.module.css";
import anonim from "./../../photos/anonim.png";
import Paginator from "../Paginator/Paginator";
import Search from "../Serach/Search";
import { NavLink } from "react-router-dom";
import lupa from "./../../photos/lupa.svg";
import LargePhoto from "../LargePhoto/LargePhoto";

const Users = (props) => {
  const [openPhoto, setOpenPhoto] = useState(false);
  const [userData, setUserPhotoData] = useState({ photo: null, name: null });

  const clickLargePhotot = (photo, name) => {
    setUserPhotoData({ ...userData, photo, name });
    setOpenPhoto(true);
  };

  return (
    <div className={s.users}>
      {openPhoto && (
        <LargePhoto
          name={userData.name}
          photo={userData.photo}
          setOpenPhoto={setOpenPhoto}
        />
      )}{" "}
      <Search
        term={props.term}
        placeholder={"Поиск пользователей"}
        setTerm={props.setTermAC}
      />
      {props.isLoading ? (
        <h1>Загрузка...</h1>
      ) : (
        <div>
          <Paginator
            page={props.page}
            setPage={props.setPageAC}
            totalCount={props.totalCount}
            count={props.count}
          />
          {props.users.length < 1&&<h1>Пользователей нет</h1>}
          {props.users.map((user) => {
            return (
              <div key={user.id} className={s.user}>
                <div className={s.userInfo}>
                  <div className={s.userAvaDiv}>
                    {user.photos.large && (
                      <div
                        onClick={() => {
                          clickLargePhotot(user.photos.large, user.name);
                        }}
                        className={s.imgOpenbtn}
                      >
                        <img alt={lupa} className={s.lupa} src={lupa} />
                      </div>
                    )}
                    <NavLink className={s.userLink} to={`/profile/${user.id}`}>
                      <img
                        className={s.userAva}
                        src={user.photos.small || anonim}
                      />
                    </NavLink>
                  </div>
                  <NavLink className={s.userLink} to={`/profile/${user.id}`}>
                    <div className={s.userNameDiv}>
                      <span className={s.userName}>{user.name}</span>
                      <span className={s.userStatus}>{user.status}</span>
                    </div>
                  </NavLink>
                </div>

                <div
                  className={s.followBtnDiv}
                  onClick={() => {
                    user.followed
                      ? props.getUserUnFollow(user.id)
                      : props.getUserFollow(user.id);
                  }}
                >
                  <p className={s.followBtnP}>
                    {user.followed ? "Отписаться" : "Подписаться"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Users;
