import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import s from './User.module.css'
import lupa from "./../../../photos/lupa.svg";
import anonim from "./../../../photos/anonim.png";
import { useDispatch } from "react-redux";
import LargePhoto from "../../LargePhoto/LargePhoto";




export const User = ({user, unFollow, follow})=>{
  const [openPhoto, setOpenPhoto] = useState(false);
  const [userData, setUserPhotoData] = useState({ photo: null, name: null });
  
  const clickLargePhoto = (photo, name) => {
    setUserPhotoData({ ...userData, photo, name });
    setOpenPhoto(true);
  };
const followBtnRef = useRef(0)
const lupaRef = useRef(0)

const navClicked = (event)=>{
    if(event.target == followBtnRef.current||event.target == lupaRef.current){
    event.preventDefault()}
}
const following = (value, id)=>{
  value?unFollow(id):follow(id)
}
    return <>
        {openPhoto && (
        <LargePhoto
          name={userData.name}
          photo={userData.photo}
          setOpenPhoto={setOpenPhoto}
        />
      )}
    <NavLink onClick={navClicked} to={`/profile/${user.id}`} className={s.userLink}>
       <div  className={s.user}>
                <div className={s.userInfo}>
                  <div className={s.userAvaDiv}>
    {user.photos.large && ( <div ref={lupaRef}onClick={() => {clickLargePhoto(user.photos.large, user.name);}} className={s.imgOpenbtn}>
                      </div>
                    )}
                      <img
                        className={s.userAva}
                        src={user.photos.small || anonim}
                      />
                  </div>
                    <div className={s.userNameAndStatusDiv}>
                      <p className={s.userName}>{user.name}</p>
                      <p className={s.userStatus}>{user.status}</p>
                    </div>
                </div>

                <btn ref={followBtnRef}
                  className={s.followBtn}
                  onClick={() => {following(user.followed, user.id)}}
                >{user.followed ? "Отписаться" : "Подписаться"}
                </btn>
              </div>

    </NavLink>

</>
}