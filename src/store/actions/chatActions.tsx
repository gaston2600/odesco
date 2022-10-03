import chatSrv from '../../services/ChatSrv';
import {
  GET_CHAT_ROOM_LIST,
  GET_CHAT_ROOM_LIST_FAILED,
  GET_CHAT_ROOM_LIST_SUCCESS,
  GET_ONE_CHAT_ROOM,
  GET_ONE_CHAT_ROOM_FAILED,
  GET_ONE_CHAT_ROOM_SUCCESS,
  INITIATE_CHAT_ROOM,
  INITIATE_CHAT_ROOM_FAILED,
  INITIATE_CHAT_ROOM_SUCCESS,
  MARK_MESSAGE_READ_CHAT,
  MARK_MESSAGE_READ_CHAT_FAILED,
  MARK_MESSAGE_READ_CHAT_SUCCESS,
  POST_MESSAGE_CHAT,
  POST_MESSAGE_CHAT_FAILED,
  POST_MESSAGE_CHAT_SUCCESS,
} from '../types/chatActionsTypes';

export const getRoomsList: any = (
  data: any,
  // callback: any,
  // callbackError: any
) => {
  return (dispatch: (arg0: {type: string; payload?: any}) => any) => {
    dispatch({
      type: GET_CHAT_ROOM_LIST,
    });

    chatSrv
      .getAllRooms(data)
      .then((response: any) => {
        dispatch({
          type: GET_CHAT_ROOM_LIST_SUCCESS,
          payload: response?.data?.data,
        });
        // callback(response?.data);
      })
      .catch(e => {
        console.log('GET_CHAT_ROOM_LIST error === ', e);
        dispatch({
          type: GET_CHAT_ROOM_LIST_FAILED,
          payload: e,
        });
        // callbackError(e.response);
      });
  };
};
export const getOneRoomChat: any = (
  data: any,
  callback: any,
  callbackError: any,
) => {
  return (dispatch: (arg0: {type: string; payload?: any}) => any) => {
    dispatch({
      type: GET_ONE_CHAT_ROOM,
    });

    chatSrv
      .getOneRoom(data)
      .then((response: any) => {
        dispatch({
          type: GET_ONE_CHAT_ROOM_SUCCESS,
          payload: response?.data?.data,
        });
        callback(response?.data?.data);
      })
      .catch(e => {
        console.log('GET_ONE_CHAT_ROOM error === ', e);
        dispatch({
          type: GET_ONE_CHAT_ROOM_FAILED,
          payload: e,
        });
        callbackError(e.response);
      });
  };
};

export const sendMessageChat: any = (
  data: any,
  callback: any,
  callbackError: any,
) => {
  return (dispatch: (arg0: {type: string; payload?: any}) => any) => {
    dispatch({
      type: POST_MESSAGE_CHAT,
    });

    chatSrv
      .postMessage(data)
      .then((response: any) => {
        dispatch({
          type: POST_MESSAGE_CHAT_SUCCESS,
          payload: response?.data?.data,
        });
        callback(response?.data?.data);
      })
      .catch(e => {
        console.log('POST_MESSAGE_CHAT error === ', e);
        dispatch({
          type: POST_MESSAGE_CHAT_FAILED,
          payload: e,
        });
        callbackError(e.response);
      });
  };
};

export const markReadMessage: any = (
  data: any,
  // callback: any,
  // callbackError: any,
) => {
  return (dispatch: (arg0: {type: string; payload?: any}) => any) => {
    dispatch({
      type: MARK_MESSAGE_READ_CHAT,
    });

    chatSrv
      .markRead(data)
      .then((response: any) => {
        dispatch({
          type: MARK_MESSAGE_READ_CHAT_SUCCESS,
          payload: response?.data?.data,
        });
        // callback(response?.data?.data);
      })
      .catch(e => {
        console.log('MARK_MESSAGE_READ_CHAT error === ', e);
        dispatch({
          type: MARK_MESSAGE_READ_CHAT_FAILED,
          payload: e,
        });
        // callbackError(e.response);
      });
  };
};
export const initiateChatRoom: any = (
  data: any,
  callback: any,
  callbackError: any,
) => {
  return (dispatch: (arg0: {type: string; payload?: any}) => any) => {
    dispatch({
      type: INITIATE_CHAT_ROOM,
    });

    chatSrv
      .initiate(data)
      .then((response: any) => {
        dispatch({
          type: INITIATE_CHAT_ROOM_SUCCESS,
          payload: response?.data?.data,
        });
        callback(response?.data?.data);
      })
      .catch(e => {
        console.log('INITIATE_CHAT_ROOM error === ', e);
        dispatch({
          type: INITIATE_CHAT_ROOM_FAILED,
          payload: e,
        });
        callbackError(e.response);
      });
  };
};
