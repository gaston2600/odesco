import {
  GET_CHAT_ROOM_LIST,
  GET_CHAT_ROOM_LIST_FAILED,
  GET_CHAT_ROOM_LIST_SUCCESS,
} from '../types/chatActionsTypes';

const INITIAL_STATE = {
  chatRooms: [],
  loading: false,
};

export default (state = INITIAL_STATE, action: {type: any; payload: any}) => {
  switch (action.type) {
    //GET COMMENTS LIST
    case GET_CHAT_ROOM_LIST:
      return {
        ...state,
        loading: true,
      };
    case GET_CHAT_ROOM_LIST_SUCCESS:
      return {
        ...state,
        chatRooms: Array.isArray(action?.payload?.chatRooms)
          ? action?.payload?.chatRooms
          : [],
        loading: false,
      };
    case GET_CHAT_ROOM_LIST_FAILED:
      return {
        ...state,
        loading: false,
      };

    //NOTHING TO DO
    default:
      return {
        ...state,
      };
  }
};
