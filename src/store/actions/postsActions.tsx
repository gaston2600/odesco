import {} from '../types';

import authSrv from '../../services/authSrv';
import {
  GET_POSTS_COMMENTS_LIST,
  GET_POSTS_COMMENTS_LIST_FAILED,
  GET_POSTS_COMMENTS_LIST_SUCCESS,
  GET_POSTS_LIST,
  GET_POSTS_LIST_FAILED,
  GET_POSTS_LIST_SUCCESS,
  GET_TEACHER_POSTS,
  GET_TEACHER_POSTS_FAILED,
  GET_TEACHER_POSTS_SUCCESS,
  LIKE_POST,
  LIKE_POST_FAILED,
  LIKE_POST_SUCCESS,
  POST_POST,
  POST_POST_FAILED,
  POST_POST_SUCCESS,
} from '../types/postsActionsTypes';
import postsSrv from '../../services/postsSrv';
import commentsSrv from '../../services/commentsSrv';

export const getPostsList: any = (
  data: any,
  callback: any,
  callbackError: any,
) => {
  return (dispatch: (arg0: {type: string; payload?: any}) => any) => {
    dispatch({
      type: GET_POSTS_LIST,
    });

    postsSrv
      .getList(data)
      .then((response: any) => {
        callback(response?.data);
        dispatch({
          type: GET_POSTS_LIST_SUCCESS,
          payload: response?.data,
        });
      })
      .catch(e => {
        console.log('GET LIST POST error === ', e);
        callbackError(e.response);
        dispatch({
          type: GET_POSTS_LIST_FAILED,
          payload: e,
        });
      });
  };
};

export const getTeacherPosts: any = (
  data: any,
  callback: any,
  callbackError: any,
) => {
  return (dispatch: (arg0: {type: string; payload?: any}) => any) => {
    dispatch({
      type: GET_TEACHER_POSTS,
    });

    postsSrv
      .getTeacherPosts(data)
      .then((response: any) => {
        callback(response?.data);
        dispatch({
          type: GET_TEACHER_POSTS_SUCCESS,
          payload: response?.data,
        });
      })
      .catch(e => {
        console.log('GET TEACHER POST error === ', e);
        callbackError(e.response);
        dispatch({
          type: GET_TEACHER_POSTS_FAILED,
          payload: e,
        });
      });
  };
};
export const getPostsComments: any = (
  data: any,
  callback: any,
  callbackError: any,
) => {
  return (dispatch: (arg0: {type: string; payload?: any}) => any) => {
    dispatch({
      type: GET_POSTS_COMMENTS_LIST,
    });

    commentsSrv
      .getPostComments(data)
      .then((response: any) => {
        callback(response?.data);
        dispatch({
          type: GET_POSTS_COMMENTS_LIST_SUCCESS,
          payload: response?.data,
        });
      })
      .catch(e => {
        console.log('GET_POSTS_COMMENTS_LIST error === ', e);
        callbackError(e.response);
        dispatch({
          type: GET_POSTS_COMMENTS_LIST_FAILED,
          payload: e,
        });
      });
  };
};

export const likePost: any = (data: any, callback: any, callbackError: any) => {
  return (dispatch: (arg0: {type: string; payload?: any}) => any) => {
    dispatch({
      type: LIKE_POST,
    });

    postsSrv
      .likePost(data)
      .then((response: any) => {
        console.log({response});

        dispatch({
          type: LIKE_POST_SUCCESS,
          payload: response?.data,
        });
        callback(response?.data);
      })
      .catch(e => {
        console.log('login error === ', e);
        dispatch({
          type: LIKE_POST_FAILED,
          payload: e,
        });
        callbackError(e.response);
      });
  };
};

export const postPost: any = (data: any, callback: any, callbackError: any) => {
  return (dispatch: (arg0: {type: string; payload?: any}) => any) => {
    const formData = new FormData();
    formData.append('is_private', !!data.is_private);
    if (data?.desc) formData.append('desc', data.desc);
    if (data?.partner_type) formData.append('partner_type', data.partner_type);
    if (data?.partner) formData.append('partner', data.partner);
    if (data?.inst_id) formData.append('inst_id', data.inst_id);
    if (data?.video) formData.append('video', data.video);

    dispatch({
      type: POST_POST,
    });

    postsSrv
      .post(formData)
      .then((response: any) => {
        // console.log({ response });

        dispatch({
          type: POST_POST_SUCCESS,
          payload: response?.data,
        });
        callback(response?.data);
      })
      .catch(e => {
        console.log('POST_POST error === ', e);
        dispatch({
          type: POST_POST_FAILED,
          payload: e,
        });
        callbackError(e.response);
      });
  };
};
