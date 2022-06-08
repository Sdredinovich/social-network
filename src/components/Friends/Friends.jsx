import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import {
  getFriends,
  setFriendsPageAC,
  setFriendsTermAC,
  setFriendsLoadingAC,
  getFriendFollow,
  getFriendUnFollow,
} from "../../redux/friendsReducer";
import Users from "../Users/Users";

const Friends = (props) => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.authPage.isAuth);
  const count = useSelector((state) => state.friendsPage.count);
  const page = useSelector((state) => state.friendsPage.page);
  const term = useSelector((state) => state.friendsPage.term);
  const isFriend = useSelector((state) => state.friendsPage.isFriend);
  const users = useSelector((state) => state.friendsPage.friends);
  const totalCount = useSelector((state) => state.friendsPage.totalCount);
  const isLoading = useSelector((state) => state.friendsPage.isLoading);

  useEffect(() => {
    return () => {
      dispatch(setFriendsLoadingAC(true));
      dispatch(setFriendsTermAC(""));
    };
  }, []);

  useEffect(() => {
    isAuth&&dispatch(getFriends(count, page, isFriend, term));
  }, [page, term]);

  const follow = useCallback((id) => {
    dispatch(getFriendFollow(id));
  }, []);
  const unFollow = useCallback((id) => {
    dispatch(getFriendUnFollow(id));
  }, []);
  const setTerm = useCallback((value) => {
    dispatch(setFriendsTermAC(value));
  }, []);
  const setPage = useCallback((page) => {
    dispatch(setFriendsPageAC(page));
  }, []);
  if (!isAuth) {return <Navigate to={"/login"} />;}
  
  return (
    <Users
      setTerm={setTerm}
      follow={follow}
      unFollow={unFollow}
      setPage={setPage}
      count={count}
      page={page}
      totalCount={totalCount}
      users={users}
      term={term}
      isLoading={isLoading}
    />
  );
};

export default Friends;
