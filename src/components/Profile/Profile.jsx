import React from "react";
import s from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = (props) => {
  return (
    <>
      {props.isLoading ? (
        <h1>ЗАГРУЗКА...</h1>
      ) : (
        <div className={s.profile}>
          <ProfileInfo
    isAuth={props.isAuth}

      putProfile={props.putProfile}
            putProfilePhoto={props.putProfilePhoto}
            itsMe={props.itsMe}
            profile={props.profile}
          />
          {!props.itsMe && props.isAuth && (
            <div
              className={s.followingDiv}
              onClick={() => {
                props.profile.followed
                  ? props.getUnFollowProfile(props.profile.userId)
                  : props.getFollowProfile(props.profile.userId);
              }}
            >
              <p className={s.followingP}>
                {props.profile.followed ? "Отписаться" : "Подписаться"}
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Profile;
