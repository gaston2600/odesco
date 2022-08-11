import {
} from "../types";
import { GET_POSTS_LIST, GET_POSTS_LIST_FAILED, GET_POSTS_LIST_SUCCESS } from "../types/postsActionsTypes";

const INITIAL_STATE = {
    posts: [],
    count : 0,
    loadingPosts: false
};

export default (state = INITIAL_STATE, action: { type: any; payload: any }) => {
    switch (action.type) {
        //POSTS LIST
        case GET_POSTS_LIST:
            return {
                ...state,
                loadingPosts: true
            };
        case GET_POSTS_LIST_SUCCESS:
            return {
                ...state,
                posts: action?.payload?.posts,
                count: action?.payload?.count,
                loadingPosts: false
            };
        case GET_POSTS_LIST_FAILED:
            return {
                ...state,
                loadingPosts: false
            };


        //NOTHING TO DO
        default:
            return {
                ...state,
            };
    }
};