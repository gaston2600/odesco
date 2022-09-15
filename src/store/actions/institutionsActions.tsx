import institutionSvr from "../../services/institutionSrv";
import { GET_INSTITUTIONS_POSTS, GET_INSTITUTIONS_POSTS_FAILED, GET_INSTITUTIONS_POSTS_SUCCESS, GET_INSTITUTION_POSTS, GET_INSTITUTION_POSTS_FAILED, GET_INSTITUTION_POSTS_SUCCESS, GET_MY_INSTITUTIONS, GET_MY_INSTITUTIONS_FAILED, GET_MY_INSTITUTIONS_SUCCESS } from "../types/institutionsActionTypes";
import { GET_PARTNER_POSTS, GET_PARTNER_POSTS_FAILED, GET_PARTNER_POSTS_SUCCESS } from "../types/partnersActionTypes";

export const getMyInstitutions = (
    data: any,
) => {
    return (dispatch: (arg0: { type: string; payload?: any }) => any) => {
        dispatch({
            type: GET_MY_INSTITUTIONS,
        });

        institutionSvr
            .my(data)
            .then((response: any) => {
                // console.log({ response });

                dispatch({
                    type: GET_MY_INSTITUTIONS_SUCCESS,
                    payload: response?.data,
                });
                // callback(response?.data);
            })
            .catch((e) => {
                console.log("login error === ", e);
                dispatch({
                    type: GET_MY_INSTITUTIONS_FAILED,
                    payload: e,
                });
                // callbackError(e.response);
            });
    };
};

export const postInst = (
    data: any,
    callback: any,
    callbackError: any
) => {
    return (dispatch: (arg0: { type: string; payload?: any }) => any) => {
        dispatch({
            type: GET_MY_INSTITUTIONS,
        });

        institutionSvr
            .post(data)
            .then((response: any) => {
                callback(response?.data);
            })
            .catch((e) => {
                console.log("postInst error === ", e);
                callbackError(e.response);
            });
    };
};

export const getInstPosts = (
    data: any,
    callback: any,
    callbackError: any
) => {
    return (dispatch: (arg0: { type: string; payload?: any }) => any) => {
        dispatch({
            type: GET_INSTITUTION_POSTS,
        });
        institutionSvr
            .getInstPosts(data)
            .then((response: any) => {
                dispatch({
                    type: GET_INSTITUTION_POSTS_SUCCESS,
                    payload: response?.data,
                });
                callback(response?.data);
            })
            .catch((e) => {
                console.log("getInstPosts error === ", e);
                dispatch({
                    type: GET_INSTITUTION_POSTS_FAILED,
                    payload: e,
                });
                callbackError(e.response);
            });
    };
};
export const getPartnerPosts = (
    data: any,
    callback: any,
    callbackError: any
) => {
    return (dispatch: (arg0: { type: string; payload?: any }) => any) => {
        dispatch({
            type: GET_PARTNER_POSTS,
        });
        institutionSvr
            .getPartnerPosts(data)
            .then((response: any) => {
                dispatch({
                    type: GET_PARTNER_POSTS_SUCCESS,
                    payload: response?.data,
                });
                callback(response?.data);
            })
            .catch((e) => {
                console.log("getPartnerPosts error === ", e);
                dispatch({
                    type: GET_PARTNER_POSTS_FAILED,
                    payload: e,
                });
                callbackError(e.response);
            });
    };
};