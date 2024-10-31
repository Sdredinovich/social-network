import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router";
import { getFollowProfile, getProfile, getUnFollowProfile, putProfileStatus, setProfilLoadingAC } from "../../redux/profileReducer";
import s from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = (props) => {
  const dispatch = useDispatch()
  const myId = useSelector(state=>state.authPage.authData.id)
  const isAuth = useSelector(state=>state.authPage.isAuth)
  const isLoading = useSelector(state=>state.profilePage.isProfileLoading)
  const profile = useSelector(state=>state.profilePage.profile)

  const { id } = useParams();
  const userId = id || myId;
  const itsMe = isAuth && userId === myId;
  const following = (value, id)=>{
    value?dispatch(getUnFollowProfile(id)):dispatch(getFollowProfile(id))
  }
  const postStatus = useCallback((status)=>{
dispatch(putProfileStatus(status))
  }, [])
  useEffect(() => {
    userId && dispatch(getProfile(userId, isAuth))
    return () => {
      dispatch(setProfilLoadingAC(true))
    };
  }, [userId]);


  if (!isAuth && !id) {
    return <Navigate to={"/login"} />;
  }
  return (
    <>
      {isLoading ? (
        <h1>ЗАГРУЗКА...</h1>
      ) : (
        <div className={s.profile}>

          <ProfileInfo
          postStatus={postStatus}
            isAuth={isAuth}
            itsMe={itsMe}
            profile={profile}
          />
          {!itsMe && isAuth && (<div className={s.followingDiv}onClick={() => {following(profile.followed, profile.userId)}}>
                {profile.followed ? "Отписаться" : "Подписаться"}</div>)}
        </div>
      )}
    </>
  );
};

export default Profile;
