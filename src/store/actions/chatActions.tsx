import chatSrv from "../../services/ChatSrv";
import { GET_CHAT_ROOM_LIST, GET_CHAT_ROOM_LIST_FAILED, GET_CHAT_ROOM_LIST_SUCCESS } from "../types/chatActionsTypes";

export const getRoomsList = (
    data: any,
    callback: any,
    callbackError: any
) => {

    return (dispatch: (arg0: { type: string; payload?: any }) => any) => {
        dispatch({
            type: GET_CHAT_ROOM_LIST,
        });

        chatSrv
            .getAllRooms(data)
            .then((response: any) => {
                dispatch({
                    type: GET_CHAT_ROOM_LIST_SUCCESS,
                    payload: response?.data,
                });
                callback(response?.data);
            })
            .catch((e) => {
                console.log("GET_CHAT_ROOM_LIST error === ", e);
                dispatch({
                    type: GET_CHAT_ROOM_LIST_FAILED,
                    payload: e,
                });
                callbackError(e.response);
            });
    };
};