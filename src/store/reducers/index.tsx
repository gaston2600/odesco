import { combineReducers } from "redux";
import PostsReducer from "./PostsReducer";
import UserReducer from "./UserReducer";
import CommentsReducer from "./CommentsReducer";
import InstitutionsReducer from "./InstitutionsReducer";
import EventsReducer from "./EventsReducer";


const appReducer = combineReducers({
  User: UserReducer,
  Posts: PostsReducer,
  Comment: CommentsReducer,
  Inst: InstitutionsReducer,
  Events: EventsReducer
});
export default appReducer;

