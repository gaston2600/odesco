import { POST_COMMENT, POST_COMMENT_FAILED, POST_COMMENT_SUCCESS } from "../types";

import authSrv from "../../services/authSrv";
import { GET_POSTS_COMMENTS_LIST, GET_POSTS_COMMENTS_LIST_FAILED, GET_POSTS_COMMENTS_LIST_SUCCESS, GET_POSTS_LIST, GET_POSTS_LIST_FAILED, GET_POSTS_LIST_SUCCESS } from "../types/postsActionsTypes";
import postsSrv from "../../services/postsSrv";
import commentsSrv from "../../services/commentsSrv";

export const postComment = (
    data: any,
    callback: any,
    callbackError: any
) => {

    return (dispatch: (arg0: { type: string; payload?: any }) => any) => {
        dispatch({
            type: POST_COMMENT,
        });

        commentsSrv
            .post(data)
            .then((response: any) => {
                dispatch({
                    type: POST_COMMENT_SUCCESS,
                    payload: response?.data,
                });
                callback(response?.data);
            })
            .catch((e) => {
                console.log("login error === ", e);
                dispatch({
                    type: POST_COMMENT_FAILED,
                    payload: e,
                });
                callbackError(e.response);
            });
    };
};