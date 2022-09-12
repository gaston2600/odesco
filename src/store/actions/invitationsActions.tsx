import invitationsSrv from "../../services/invitationsSrv";
import { GET_INVITATIONS_LIST, GET_INVITATIONS_LIST_FAILED, GET_INVITATIONS_LIST_SUCCESS } from "../types";

export const getInvitationsList = (
    data: any,
    callback: any,
    callbackError: any
) => {
    return (dispatch: (arg0: { type: string; payload?: any }) => any) => {
        dispatch({
            type: GET_INVITATIONS_LIST,
        });

        invitationsSrv
            .getList(data)
            .then((response: any) => {
                dispatch({
                    type: GET_INVITATIONS_LIST_SUCCESS,
                    payload: response?.data,
                });
                callback(response?.data)
            })
            .catch((e) => {
                console.log("GET_INVITATIONS_LIST error === ", e);
                dispatch({
                    type: GET_INVITATIONS_LIST_FAILED,
                    payload: e,
                });
                callbackError(e.response);
            });
    };
};
