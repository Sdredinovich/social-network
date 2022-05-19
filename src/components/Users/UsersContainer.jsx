import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  getUsers,
  setUsersPageAC,
  setUsersTermAC,
  getUserFollow,
  getUserUnFollow,
  setUsersLoadingAC,
} from "../../redux/usersReduces";
import Users from "./Users";

const UsersContainer = (props) => {
  useEffect(() => {
    return () => {
      props.setUsersLoadingAC(true);
    };
  }, []);

  useEffect(() => {
    props.getUsers(props.count, props.page, props.isFriend, props.term);
  }, [props.page, props.term]);

  return (
    <Users
      getUserUnFollow={props.getUserUnFollow}
      getUserFollow={props.getUserFollow}
      isLoading={props.isLoading}
      page={props.page}
      term={props.term}
      setTermAC={props.setUsersTermAC}
      setPageAC={props.setUsersPageAC}
      count={props.count}
      totalCount={props.totalCount}
      users={props.users}
    />
  );
};
const mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    page: state.usersPage.page,
    count: state.usersPage.count,
    isFriend: state.usersPage.isFriend,
    term: state.usersPage.term,
    isLoading: state.usersPage.isLoading,

    totalCount: state.usersPage.totalCount,
  };
};
export default connect(mapStateToProps, {
  getUsers,
  setUsersPageAC,
  setUsersTermAC,
  getUserFollow,
  getUserUnFollow,
  setUsersLoadingAC,
})(UsersContainer);
