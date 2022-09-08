import commentsSrv from "../../services/commentsSrv";
import eventsSrv from "../../services/eventsSrv";
import { GET_EVENTS_LIST, GET_EVENTS_LIST_FAILED, GET_EVENTS_LIST_SUCCESS, SUBSCRIBE_EVENT, SUBSCRIBE_EVENT_FAILED, SUBSCRIBE_EVENT_SUCCESS } from "../types/eventsActionsType";

export const getEvents = (
    data: any,
    callback: any,
    callbackError: any
) => {
    return (dispatch: (arg0: { type: string; payload?: any }) => any) => {
        dispatch({
            type: GET_EVENTS_LIST,
        });
        eventsSrv
            .getList(data)
            .then((response: any) => {
                dispatch({
                    type: GET_EVENTS_LIST_SUCCESS,
                    payload: response?.data,
                });
                callback(response?.data);
            })
            .catch((e) => {
                console.log("login error === ", e);
                dispatch({
                    type: GET_EVENTS_LIST_FAILED,
                    payload: e,
                });
                callbackError(e.response);
            });
    };
};

export const subscribeEvent = (
    data: any,
    callback: any,
    callbackError: any
) => {
    return (dispatch: (arg0: { type: string; payload?: any }) => any) => {
        dispatch({
            type: SUBSCRIBE_EVENT,
        });
        eventsSrv
            .subscribe(data)
            .then((response: any) => {
                dispatch({
                    type: SUBSCRIBE_EVENT_SUCCESS,
                    payload: response?.data,
                });
                callback(response?.data);
            })
            .catch((e) => {
                console.log("subscribe error === ", e);
                dispatch({
                    type: SUBSCRIBE_EVENT_FAILED,
                    payload: e,
                });
                callbackError(e.response);
            });
    };
};