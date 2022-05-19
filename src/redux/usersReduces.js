import { followApi, usersApi } from "../API/api";

const SET_USERS = "SET_USERS";
const SET_USERS_LOADING = "SET_USERS_LOADING";
const SET_TOTAL_COUNT = "SET_TOTAL_COUNT";
const SET_USERS_PAGE = "SET_USERS_PAGE";
const SET_USERS_TERM = "SET_USERS_TERM";
const SET_USER_FOLLOWING = "SET_USER_FOLLOWING";

const initialState = {
  users: [],
  isFriend: null,
  term: "",
  isLoading: true,
  count: 10,
  page: 121,
  totalCount: null,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: [...action.value],
      };
    case SET_USERS_LOADING:
      return {
        ...state,
        isLoading: action.value,
      };
    case SET_TOTAL_COUNT:
      return {
        ...state,
        totalCount: action.value,
      };
    case SET_USERS_PAGE:
      return {
        ...state,
        page: action.value,
      };
    case SET_USER_FOLLOWING:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id == action.userID) {
            return { ...user, followed: action.value };
          } else {
            return user;
          }
        }),
      };
    case SET_USERS_TERM:
      return {
        ...state,
        term: action.value,
        page: 1,
      };
    default:
      return state;
  }
};

const setUsersAC = (value) => ({ type: SET_USERS, value });
const setTotalCountAC = (value) => ({ type: SET_TOTAL_COUNT, value });
const setUserFollowingAC = (userID, value) => ({
  type: SET_USER_FOLLOWING,
  userID,
  value,
});
export const setUsersPageAC = (value) => ({ type: SET_USERS_PAGE, value });
export const setUsersTermAC = (value) => ({ type: SET_USERS_TERM, value });

export const setUsersLoadingAC = (value) => ({
  type: SET_USERS_LOADING,
  value,
});

export const getUsers = (count, page, isFriend, term) => (dispatch) => {
  usersApi.getUsers(count, page, isFriend, term).then((res) => {
    dispatch(setUsersAC(res.items));
    dispatch(setTotalCountAC(res.totalCount));
    dispatch(setUsersLoadingAC(false));
  });
};

export const getUserFollow = (userID) => (dispatch) => {
  followApi.postFollow(userID).then((res) => {
 if(!res.data.resultCode){
  dispatch(setUserFollowingAC(userID, true));
 }
  });
};
export const getUserUnFollow = (userID) => (dispatch) => {
  followApi.deleteFollow(userID).then((res) => {
    if(!res.data.resultCode){
      dispatch(setUserFollowingAC(userID, false));
    }
  });
};

export default usersReducer;
