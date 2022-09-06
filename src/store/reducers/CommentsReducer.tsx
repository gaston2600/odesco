import { POST_COMMENT, POST_COMMENT_FAILED, POST_COMMENT_SUCCESS } from "../types";
import { GET_POSTS_COMMENTS_LIST, GET_POSTS_COMMENTS_LIST_FAILED, GET_POSTS_COMMENTS_LIST_SUCCESS } from "../types/postsActionsTypes";

const INITIAL_STATE = {
    comments: [],
    loadingComments: false,
    loadingPostComment: false,
};

export default (state = INITIAL_STATE, action: { type: any; payload: any }) => {
    switch (action.type) {

        //GET COMMENTS LIST
        case GET_POSTS_COMMENTS_LIST:
            return {
                ...state,
                loadingComments: true
            };
        case GET_POSTS_COMMENTS_LIST_SUCCESS:
            return {
                ...state,
                comments: action?.payload?.comments?.comments,
                loadingComments: false
            };
        case GET_POSTS_COMMENTS_LIST_FAILED:
            return {
                ...state,
                loadingComments: false
            };

        //POST COMMENT
        case POST_COMMENT:
            return {
                ...state,
                loadingPostComment: true
            };
        case POST_COMMENT_SUCCESS:
            return {
                ...state,
                loadingPostComment: false
            };
        case POST_COMMENT_FAILED:
            return {
                ...state,
                loadingPostComment: false
            };

        //NOTHING TO DO
        default:
            return {
                ...state,
            };
    }
};