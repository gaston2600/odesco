import networkSrv from "../../services/networkSrv";
import { ACCEPT_MEMBER_NETWORK, ACCEPT_MEMBER_NETWORK_FAILED, ACCEPT_MEMBER_NETWORK_SUCCESS, ADD_MEMBER_NETWORK, ADD_MEMBER_NETWORK_FAILED, ADD_MEMBER_NETWORK_SUCCESS, GET_ONE_NETWORK, GET_ONE_NETWORK_FAILED, GET_ONE_NETWORK_SUCCESS } from "../types/networkActionsType";

export const getNetwork = (
    data: any,
) => {
    return (dispatch: (arg0: { type: string; payload?: any }) => any) => {
        dispatch({
            type: GET_ONE_NETWORK,
        });

        networkSrv
            .getOne(data)
            .then((response: any) => {
                // console.log({ response });

                dispatch({
                    type: GET_ONE_NETWORK_SUCCESS,
                    payload: response?.data,
                });
                // callback(response?.data);
            })
            .catch((e) => {
                console.log("GET_ONE_NETWORK error === ", e);
                dispatch({
                    type: GET_ONE_NETWORK_FAILED,
                    payload: e,
                });
                // callbackError(e.response);
            });
    };
};
export const acceptMemberNetwork = (
    data: any,
    callback: any,
    callbackError: any,
) => {
    return (dispatch: (arg0: { type: string; payload?: any }) => any) => {
        dispatch({
            type: ACCEPT_MEMBER_NETWORK,
        });

        networkSrv
            .acceptMember(data)
            .then((response: any) => {
                // console.log({ response });

                dispatch({
                    type: ACCEPT_MEMBER_NETWORK_SUCCESS,
                    payload: response?.data,
                });
                callback(response?.data);
            })
            .catch((e) => {
                console.log("ACCEPT_MEMBER_NETWORK error === ", e);
                dispatch({
                    type: ACCEPT_MEMBER_NETWORK_FAILED,
                    payload: e,
                });
                callbackError(e.response);
            });
    };
};

export const addMemberNetwork = (
    data: any,
    callback: any,
    callbackError: any,
) => {
    return (dispatch: (arg0: { type: string; payload?: any }) => any) => {
        dispatch({
            type: ADD_MEMBER_NETWORK,
        });

        networkSrv
            .addMember(data)
            .then((response: any) => {
                // console.log({ response });

                dispatch({
                    type: ADD_MEMBER_NETWORK_SUCCESS,
                    payload: response?.data,
                });
                callback(response?.data);
            })
            .catch((e) => {
                console.log("ADD_MEMBER_NETWORK error === ", e);
                dispatch({
                    type: ADD_MEMBER_NETWORK_FAILED,
                    payload: e,
                });
                callbackError(e.response);
            });
    };
};