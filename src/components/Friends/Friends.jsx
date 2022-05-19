import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import LargePhoto from "../LargePhoto/LargePhoto";
import Paginator from "../Paginator/Paginator";
import Search from "../Serach/Search";
import anonim from "./../../photos/anonim.jpg";
import lupa from "./../../photos/lupa.svg";

import s from "./Friends.module.css";

const Friends = (props) => {
  const [openPhoto, setOpenPhoto] = useState(false);
  const [userData, setUserPhotoData] = useState({ photo: null, name: null });

  const clickLargePhotot = (photo, name) => {
    setUserPhotoData({ ...userData, photo, name });
    setOpenPhoto(true);
  };
  return (
    <>
      <div className={s.friends}>
        {openPhoto && (
          <LargePhoto
            name={userData.name}
            photo={userData.photo}
            setOpenPhoto={setOpenPhoto}
          />
        )}

        <Search
          term={props.term}
          placeholder={"Поиск друзей"}
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
          {props.friends.length < 1&&<h1>Пользователей нет</h1>}

            {props.friends.map((friend) => {
              return (
                <div key={friend.id} className={s.friend}>
                  <div className={s.friendInfo}>
                    <div className={s.friendAvaDiv}>
                      {friend.photos.large && (
                        <div
                          onClick={() => {
                            clickLargePhotot(friend.photos.large, friend.name);
                          }}
                          className={s.imgOpenbtn}
                        >
                          <img alt={lupa} className={s.lupa} src={lupa} />
                        </div>
                      )}
                      <NavLink
                        className={s.friendLink}
                        key={friend.id}
                        to={`/profile/${friend.id}`}
                      >
                        <img
                          className={s.friendAva}
                          src={friend.photos.small || anonim}
                        ></img>
                      </NavLink>
                    </div>
                    <NavLink
                      className={s.friendLink}
                      key={friend.id}
                      to={`/profile/${friend.id}`}
                    >
                      <div className={s.friendNameDiv}>
                        <span className={s.friendName}>{friend.name}</span>
                        <span className={s.friendStatus}>{friend.status}</span>
                      </div>
                    </NavLink>
                  </div>
                  <div
                    className={s.followBtnDiv}
                    onClick={() => {
                      friend.followed
                        ? props.getFriendUnFollow(friend.id)
                        : props.getFriendFollow(friend.id);
                    }}
                  >
                    <p className={s.followBtnP}>
                      {friend.followed ? "Отписаться" : "Подписаться"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Friends;
