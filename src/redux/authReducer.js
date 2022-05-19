import { authApi, profileApi } from "../API/api";

const SET_AUTH_DATA = "SET_AUTH_DATA";
const DELETE_AUTH_DATA = "DELETE_AUTH_DATA";
const SET_INIT = "SET_INIT";
const SET_MY_PROFILE = "SET_MY_PROFILE";
const SET_CAPTCHA = "SET_CAPTCHA";
const SET_PROFILE_STATUS = "SET_PROFILE_STATUS";
const SET_PROFILE_PHOTO = "SET_PROFILE_PHOTO";
const initialState = {
  authData: {
    id: null,
    email: null,
    login: null,
  },
  myProfile: null,
  isInit: false,
  isAuth: false,
  captcha: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_DATA:
      return { ...state, authData: { ...action.value }, isAuth: true };
    case DELETE_AUTH_DATA:
      return {
        ...state,
        authData: { id: null, email: null, login: null },
        isAuth: false,
        myProfile: null,
      };
    case SET_MY_PROFILE:
      return { ...state, myProfile: {...state.myProfile, ...action.value} };
    case SET_INIT:
      return { ...state, isInit: true };
    case SET_CAPTCHA:
      return { ...state, captcha: action.value };
      case SET_PROFILE_PHOTO:
        return { ...state, myProfile: { ...state.myProfile, photos: action.value } };
    default:
      return state;
  }
};

const setAuthDataAC = (value) => ({ type: SET_AUTH_DATA, value });
const setCaptchaAC = (value) => ({ type: SET_CAPTCHA, value });
const setMyProfile = (value) => ({ type: SET_MY_PROFILE, value });
const deleteAuthDataAC = () => ({ type: DELETE_AUTH_DATA });
const setInitAC = () => ({ type: SET_INIT });


export const login = (data) => async (dispatch) => {
  const res = await authApi.login(data);
  switch (res.data.resultCode) {
    case 0:
      const auth = await authApi.authMe();
      const profile = await profileApi.getProfile(auth.data.id);
      dispatch(setMyProfile(profile.data));
      !auth.resultCode && dispatch(setAuthDataAC({ ...auth.data }));
    case 1:
      return res.data.resultCode;
    case 10:
      dispatch(setCaptchaAC(res.captcha));
  }
};

export const logOut = () => async (dispatch) => {
  const res = await authApi.logOut();
  !res.data.resultCode && dispatch(deleteAuthDataAC());
};

export const initialMe = () => async (dispatch) => {
  try {
    const auth = await authApi.authMe();
    const profile = await profileApi.getProfile(auth.data.id);
    const statusData = await profileApi.getProfileStatus(auth.data.id);
    dispatch(setMyProfile({ ...profile.data, status: statusData.data }));
    !auth.resultCode && dispatch(setAuthDataAC({ ...auth.data }));
  } finally {
    dispatch(setInitAC());
  }
};



export default authReducer;
