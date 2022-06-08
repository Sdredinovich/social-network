import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserFollow,
  getUsers,
  getUserUnFollow,
  setUsersLoadingAC,
  setUsersPageAC,
  setUsersTermAC,
} from "../../redux/usersReduces";

import Users from "../Users/Users";

export const AllUsers = (props) => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.usersPage.count);
  const page = useSelector((state) => state.usersPage.page);
  const term = useSelector((state) => state.usersPage.term);
  const isFriend = useSelector((state) => state.usersPage.isFriend);
  const users = useSelector((state) => state.usersPage.users);
  const totalCount = useSelector((state) => state.usersPage.totalCount);
  const isLoading = useSelector((state) => state.usersPage.isLoading);

  useEffect(() => {
    return () => {
      dispatch(setUsersLoadingAC(true));
      dispatch(setUsersTermAC(""));
    };
  }, []);

  useEffect(() => {
    dispatch(getUsers(count, page, isFriend, term));
  }, [page, term]);

  const follow = useCallback((id) => {
    dispatch(getUserFollow(id));
  }, []);
  const unFollow = useCallback((id) => {
    dispatch(getUserUnFollow(id));
  }, []);
  const setTerm = useCallback((value) => {
    dispatch(setUsersTermAC(value));
  }, []);
  const setPage = useCallback((page) => {
    dispatch(setUsersPageAC(page));
  }, []);

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
