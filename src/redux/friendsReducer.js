import { followApi, usersApi } from "../API/api";

const SET_FRIENDS = "SET_FRIENDS";
const SET_FRIENDS_PAGE = "SET_FRIENDS_PAGE";
const SET_TOTAL_COUNT = "SET_TOTAL_COUNT";
const SET_FRIENDS_TERM = "SET_FRIENDS_TERM";
const SET_FRIEND_FOLLOWING = "SET_FRIEND_FOLLOWING";
const SET_FRIENDS_LOADING = "SET_FRIENDS_LOADING";

const initialState = {
  friends: [],
  isFriend: true,
  term: "",
  isLoading: true,
  count: 10,
  page: 1,
  totalCount: null,
};

const friendsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FRIENDS:
      return {
        ...state,
        friends: [...action.value],
      };
    case SET_FRIENDS_PAGE:
      return {
        ...state,
        page: action.value,
      };
    case SET_FRIENDS_LOADING:
      return {
        ...state,
        isLoading: action.value,
      };
    case SET_TOTAL_COUNT:
      return {
        ...state,
        totalCount: action.value,
      };
      case SET_FRIEND_FOLLOWING:
        return {
          ...state,
          friends: state.friends.map((user) => {
            if (user.id == action.userID) {
              return { ...user, followed: action.value };
            } else {
              return user;
            }
          }),
        };
    case SET_FRIENDS_TERM:
      return {
        ...state,
        term: action.value,
        page: 1,
      };
    default:
      return state;
  }
};

const setFriendsAC = (value) => ({ type: SET_FRIENDS, value });
const setTotalCountAC = (value) => ({ type: SET_TOTAL_COUNT, value });
export const setFriendsTermAC = (value) => ({ type: SET_FRIENDS_TERM, value });
export const setFriendsLoadingAC = (value) => ({
  type: SET_FRIENDS_LOADING,
  value,
});
const setFriendFollowingAC = (userID, value) => ({
  type: SET_FRIEND_FOLLOWING,
  userID,
  value,
});

export const setFriendsPageAC = (value) => ({ type: SET_FRIENDS_PAGE, value });

export const getFriends = (count, page, isFriend, term) => (dispatch) => {
  usersApi.getUsers(count, page, isFriend, term).then((res) => {
    dispatch(setFriendsAC(res.items));
    dispatch(setTotalCountAC(res.totalCount));
    dispatch(setFriendsLoadingAC(false));
  });
};

export const getFriendFollow = (userID) => (dispatch) => {
  followApi.postFollow(userID).then((res) => {
    dispatch(setFriendFollowingAC(userID, true));
  });
};
export const getFriendUnFollow = (userID) => (dispatch) => {
  followApi.deleteFollow(userID).then((res) => {
    dispatch(setFriendFollowingAC(userID, false));
  });
};

export default friendsReducer;
