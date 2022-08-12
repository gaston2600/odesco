import { combineReducers } from "redux";
import PostsReducer from "./PostsReducer";
import UserReducer from "./UserReducer";
import CommentsReducer from "./CommentsReducer";


const appReducer = combineReducers({
  User: UserReducer,
  Posts: PostsReducer,
  Comment: CommentsReducer
});
export default appReducer;

