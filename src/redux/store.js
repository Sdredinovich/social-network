import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import authReducer from "./authReducer";
import friendsReducer from "./friendsReducer";
import newsReducer from "./newsReducer";
import profileReducer from "./profileReducer";
import usersReducer from './usersReduces'
// import loginReducer from './loginReducer'

let redusers = combineReducers({
  authPage: authReducer,
  usersPage: usersReducer,
  friendsPage: friendsReducer,
  profilePage: profileReducer,
newsPage: newsReducer
});
const store = createStore(redusers, applyMiddleware(thunk));

export default store;
