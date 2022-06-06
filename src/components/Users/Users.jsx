import React, { useEffect, useState } from "react";
import s from "./Users.module.css";
import anonim from "./../../photos/anonim.png";
import Paginator from "../Paginator/Paginator";
import Search from "../Serach/Search";
import { NavLink } from "react-router-dom";
import lupa from "./../../photos/lupa.svg";
import LargePhoto from "../LargePhoto/LargePhoto";
import { useDispatch, useSelector } from "react-redux";
import { getUserFollow, getUsers, getUserUnFollow, setUsersLoadingAC, setUsersPageAC, setUsersTermAC } from "../../redux/usersReduces";

const Users = (props) => {
const dispatch = useDispatch()
const count = useSelector(state => state.usersPage.count)
const page = useSelector(state => state.usersPage.page)
const term = useSelector(state => state.usersPage.term)
const isFriend = useSelector(state => state.usersPage.isFriend)
const users = useSelector(state => state.usersPage.users)
const totalCount = useSelector(state => state.usersPage.totalCount)
const isLoading = useSelector(state => state.usersPage.isLoading)
useEffect(() => {
  return () => {
    dispatch(setUsersLoadingAC(true))
    dispatch(setUsersTermAC(''))
  };
}, []);

useEffect(() => {
  dispatch(getUsers(count, page, isFriend, term))
}, [page, term]);

const following = (value, id)=>{
  value?dispatch(getUserUnFollow(id)):dispatch(getUserFollow(id))
}



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
        term={term}
        placeholder={"Поиск пользователей"}
        setTerm={setUsersTermAC}
      />
      {isLoading ? (
        <h1>Загрузка...</h1>
      ) : (
        <div>
          <Paginator
            page={page}
            setPage={setUsersPageAC}
            totalCount={totalCount}
            count={count}
          />
          {users.length < 1&&<h1>Пользователей нет</h1>}
          {users.map((user) => {
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
                  onClick={() => {following(user.followed, user.id)}}
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
