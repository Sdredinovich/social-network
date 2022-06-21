import React from "react";
import ProfileAboutUser from "./ProfileAboutUser/ProfileAboutUser";
import s from "./ProfileInfo.module.css";
import ProfilePhoto from "./ProfilePhoto/ProfilePhoto";

const ProfileInfo = (props) => {
  return (
    <div className={s.profileInfo}>
      <ProfilePhoto
        fullName={props.profile.fullName}
        itsMe={props.itsMe}
        photo={props.profile.photos.large}
      />

      <ProfileAboutUser
        isAuth={props.isAuth}
        itsMe={props.itsMe}
        profile={props.profile}
      />
    </div>
  );
};

export default ProfileInfo;
