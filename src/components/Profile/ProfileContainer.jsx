import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { useParams } from "react-router";
import {
  getProfile,
  getUnFollowProfile,
  getFollowProfile,
  setProfilLoadingAC,
  putProfile,
  putProfilePhoto,
  putProfileStatus,
} from "../../redux/profileReducer";

import Profile from "./Profile";


const ProfileContainer = ({
  putProfile,
  putProfilePhoto,
  putProfileStatus,
  getUnFollowProfile,
  getFollowProfile,
  followed,
  isLoading,
  profile,
  myId,
  getProfile,
  isAuth,
  setProfilLoadingAC,
  serverError,
  myProfile,
}) => {
  const { id } = useParams();
  const userId = id || myId;
  const itsMe = isAuth && userId == myId;

  useEffect(() => {
    return () => {
      setProfilLoadingAC(true);
    };
  }, [userId]);
  useEffect(() => {
    userId && getProfile(userId, isAuth);
  }, [userId]);

  if (!isAuth && !id) {
    return <Navigate to={"/login"} />;
  }
  if (serverError) {
    return <Navigate to={"/serverError"} />;
  }
  return (
    <Profile
      putProfile={putProfile}
      isAuth={isAuth}
      getUnFollowProfile={getUnFollowProfile}
      getFollowProfile={getFollowProfile}
      followed={followed}
      putProfilePhoto={putProfilePhoto}
      itsMe={itsMe}
      isLoading={isLoading}
      profile={profile}
    />
  );
};

let mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    serverError: state.profilePage.serverError,
    isLoading: state.profilePage.isProfileLoading,
    myId: state.authPage.authData.id,
    isAuth: state.authPage.isAuth,
    myProfile: state.authPage.myProfile,
  };
};

export default connect(mapStateToProps, {
  setProfilLoadingAC,
  getUnFollowProfile,
  getFollowProfile,
  getProfile,
  putProfileStatus,
  putProfilePhoto,
  putProfile,
})(ProfileContainer);
