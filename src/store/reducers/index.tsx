import { combineReducers } from "redux";
import PostsReducer from "./PostsReducer";
import UserReducer from "./UserReducer";
import CommentsReducer from "./CommentsReducer";
import InstitutionsReducer from "./InstitutionsReducer";


const appReducer = combineReducers({
  User: UserReducer,
  Posts: PostsReducer,
  Comment: CommentsReducer,
  Inst : InstitutionsReducer
});
export default appReducer;

