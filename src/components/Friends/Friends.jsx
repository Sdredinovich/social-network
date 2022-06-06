import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LargePhoto from "../LargePhoto/LargePhoto";
import Paginator from "../Paginator/Paginator";
import Search from "../Serach/Search";
import anonim from "./../../photos/anonim.png";
import lupa from "./../../photos/lupa.svg";
import {
  getFriends,
  setFriendsPageAC,
  setFriendsTermAC,
  setFriendsLoadingAC,
  getFriendFollow,
  getFriendUnFollow, 
} from "../../redux/friendsReducer";
import s from "./Friends.module.css";

const Friends = (props) => {
  const dispatch = useDispatch()
  const [openPhoto, setOpenPhoto] = useState(false);
  const [userData, setUserPhotoData] = useState({ photo: null, name: null });
  const isAuth = useSelector(state=>state.authPage.isAuth)
  const isLoading = useSelector(state=>state.friendsPage.isLoading)
  const term = useSelector(state=>state.friendsPage.term)
  const totalCount = useSelector(state=>state.friendsPage.totalCount)
  const count = useSelector(state=>state.friendsPage.count)
  const page = useSelector(state=>state.friendsPage.page)
  const isFriend = useSelector(state=>state.friendsPage.isFriend)
  const friends = useSelector(state=>state.friendsPage.friends)


  const clickLargePhoto = (photo, name) => {
    setUserPhotoData({ ...userData, photo, name });
    setOpenPhoto(true);
  };
  useEffect(() => {
    return () => {
      dispatch(setFriendsLoadingAC(true))
    };
  }, []);

  useEffect(() => {
    isAuth &&
      dispatch(getFriends(count, page, isFriend,term))
  }, [page, term]);
  const following = (value, id)=>{
    value?dispatch(getFriendUnFollow(id)):dispatch(getFriendFollow(id))
  }

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
          setTerm={setFriendsTermAC}
        />
        {isLoading ? (
          <h1>Загрузка...</h1>
        ) : (
          <div>
            <Paginator
              page={page}
              setPage={setFriendsPageAC}
              totalCount={totalCount}
              count={count}
            />
          {friends.length < 1&&<h1>Пользователей нет</h1>}

            {friends.map((friend) => {
              return (
                <div key={friend.id} className={s.friend}>
                  <div className={s.friendInfo}>
                    <div className={s.friendAvaDiv}>
                      {friend.photos.large && (
                        <div
                          onClick={() => {
                            clickLargePhoto(friend.photos.large, friend.name);
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
                    onClick={() => {following(friend.followed, friend.id)}}
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
