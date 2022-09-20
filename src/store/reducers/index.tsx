import { combineReducers } from "redux";
import PostsReducer from "./PostsReducer";
import UserReducer from "./UserReducer";
import CommentsReducer from "./CommentsReducer";
import InstitutionsReducer from "./InstitutionsReducer";
import EventsReducer from "./EventsReducer";
import InvitationReducer from "./InvitationReducer";
import TeachersReducer from "./TeachersReducer";
import NetworkReducer from "./NetworkReducer";
import ChatReducer from "./ChatReducer";


const appReducer = combineReducers({
  User: UserReducer,
  Posts: PostsReducer,
  Comment: CommentsReducer,
  Inst: InstitutionsReducer,
  Events: EventsReducer,
  Invitations: InvitationReducer,
  Teachers: TeachersReducer,
  Network: NetworkReducer,
  Chat: ChatReducer
});
export default appReducer;

