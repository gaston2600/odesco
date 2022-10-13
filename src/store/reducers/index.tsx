import {combineReducers} from 'redux';
import PostsReducer from './PostsReducer';
import UserReducer from './UserReducer';
import CommentsReducer from './CommentsReducer';
import InstitutionsReducer from './InstitutionsReducer';
import EventsReducer from './EventsReducer';
import InvitationReducer from './InvitationReducer';
import TeachersReducer from './TeachersReducer';
import NetworkReducer from './NetworkReducer';
import ChatReducer from './ChatReducer';
import NotificationReducer from './NotificationReducer';

const appReducer = combineReducers({
  User: UserReducer,
  Posts: PostsReducer,
  Comment: CommentsReducer,
  Inst: InstitutionsReducer,
  Events: EventsReducer,
  Invitations: InvitationReducer,
  Teachers: TeachersReducer,
  Network: NetworkReducer,
  Chat: ChatReducer,
  Notification: NotificationReducer,
});
export default appReducer;
