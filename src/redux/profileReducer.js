import { followApi, profileApi } from "../API/api";

const SET_PROFILE = "SET_PROFILE";
const SET_PROFILE_STATUS = "SET_PROFILE_STATUS";
const SET_PROFILE_LOADING = "SET_PROFILE_LOADING";
const SET_PROFILE_PHOTO = "SET_PROFILE_PHOTO";
const SET_PROFILE_FOLLOWING = "SET_PROFILE_FOLLOWING";

const initialState = {
  profile: null,
  isProfileLoading: true,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILE:
      return { ...state, profile: { ...state.profile, ...action.value } };
    case SET_PROFILE_FOLLOWING:
      return {
        ...state,
        profile: { ...state.profile, followed: action.value },
      };
    case SET_PROFILE_STATUS:
      return { ...state, profile: { ...state.profile, status: action.value } };

    case SET_PROFILE_PHOTO:
      return { ...state, profile: { ...state.profile, photos: action.value } };
    case SET_PROFILE_LOADING:
      return { ...state, isProfileLoading: action.value };
    default:
      return state;
  }
};

const setProfileStatusAC = (value) => ({ type: SET_PROFILE_STATUS, value });
const setProfileAC = (value) => ({ type: SET_PROFILE, value });
export const setProfilLoadingAC = (value) => ({
  type: SET_PROFILE_LOADING,
  value,
});
const setProfilePhotoAC = (value) => ({ type: SET_PROFILE_PHOTO, value });
const setProfileFollowingAC = (value) => ({
  type: SET_PROFILE_FOLLOWING,
  value,
});

export const getProfile = (userId, isAuth) => async (dispatch) => {
  dispatch(setProfilLoadingAC(true));
 
    const profileData = await profileApi.getProfile(userId);
    const statusData = await profileApi.getProfileStatus(userId);
    const followingData =
      (isAuth && (await followApi.getFollow(userId))) || false;

    dispatch(
      setProfileAC({
        ...profileData.data,
        status: statusData.data,
        followed: followingData,
      })
    );
    dispatch(setProfilLoadingAC(false));
  
};
export const putProfileStatus = (status) => async (dispatch) => {

  const res = await profileApi.putProfileStatus(status);
  if(res.data.resultCode===0){
    dispatch(setProfileStatusAC(status));
  }
  console.log(res.data);
};
export const putProfile = (profile) => async (dispatch) => {
  const res = await profileApi.putProfile(profile);
  if (res.data.resultCode === 0) {
    dispatch(setProfileAC(profile));
    return 0;
  }
  return 1;
};

export const putProfilePhoto = (photo) => async (dispatch) => {
  
  const res = await profileApi.putProfilePhoto(photo);
  if (res.resultCode == 0) {
    dispatch(setProfilePhotoAC(res.data.photos));
  }
};



export const getFollowProfile = (userID) => async (dispatch) => {
  const res = await followApi.postFollow(userID);
  if (!res.data.resultCode) {
    dispatch(setProfileFollowingAC(true));
  }
};
export const getUnFollowProfile = (userID) => async (dispatch) => {
  const res = await followApi.deleteFollow(userID);
  if (!res.data.resultCode) {
    dispatch(setProfileFollowingAC(false));
  }
};

export default profileReducer;
