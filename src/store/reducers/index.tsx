import { combineReducers } from "redux";
import PostsReducer from "./PostsReducer";
import UserReducer from "./UserReducer";


const appReducer =  combineReducers({
  User: UserReducer,
  Posts: PostsReducer,
});
export default appReducer;

