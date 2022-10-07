import {LOGOUT} from '../types';
import {
  GET_LIST_NOTIFICATIONS,
  GET_LIST_NOTIFICATIONS_FAILED,
  GET_LIST_NOTIFICATIONS_SUCCESS,
} from '../types/notificationActionsTypes';

const INITIAL_STATE = {
  notifications: [],
  loading: false,
};

export default (state = INITIAL_STATE, action: {type: any; payload: any}) => {
  switch (action.type) {
    case GET_LIST_NOTIFICATIONS:
      return {
        ...state,
        loading: true,
      };
    case GET_LIST_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: action?.payload?.notifications,
        loading: false,
      };
    case GET_LIST_NOTIFICATIONS_FAILED:
      return {
        ...state,
        loading: false,
      };
    case LOGOUT:
      return {
        INITIAL_STATE,
      };
    //NOTHING TO DO
    default:
      return {
        ...state,
      };
  }
};
