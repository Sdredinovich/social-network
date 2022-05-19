import React, { useEffect } from "react";
import { connect } from "react-redux";
import { WithAuthRedirect } from "../../hoc/withAuthRedirect";
import {
  getFriends,
  setFriendsPageAC,
  setFriendsTermAC,
  setFriendsLoadingAC,
  getFriendFollow,
  getFriendUnFollow,
} from "../../redux/friendsReducer";
import Friends from "./Friends";

const FriendsContainer = (props) => {
  useEffect(() => {
    return () => {
      props.setFriendsLoadingAC(true);
    };
  }, []);

  useEffect(() => {
    props.isAuth &&
      props.getFriends(props.count, props.page, props.isFriend, props.term);
  }, [props.page, props.term]);


  return (
    <Friends
      getFriendFollow={props.getFriendFollow}
      getFriendUnFollow={props.getFriendUnFollow}
      isLoading={props.isLoading}
      page={props.page}
      term={props.term}
      setTermAC={props.setFriendsTermAC}
      setPageAC={props.setFriendsPageAC}
      count={props.count}
      totalCount={props.totalCount}
      friends={props.friends}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    friends: state.friendsPage.friends,
    page: state.friendsPage.page,
    count: state.friendsPage.count,
    isFriend: state.friendsPage.isFriend,
    term: state.friendsPage.term,
    totalCount: state.friendsPage.totalCount,
    isLoading: state.friendsPage.isLoading,
    isAuth: state.authPage.isAuth,
  };
};

export default WithAuthRedirect( connect(mapStateToProps, {
  getFriends,
  setFriendsPageAC,
  setFriendsTermAC,
  setFriendsLoadingAC,
  getFriendUnFollow,
  getFriendFollow,
})(FriendsContainer))
