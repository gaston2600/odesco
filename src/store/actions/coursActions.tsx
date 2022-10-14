import coursSrv from '../../services/coursSrv';
import {
  GET_CHAPTERS_COURS,
  GET_CHAPTERS_COURS_FAILED,
  GET_CHAPTERS_COURS_SUCCESS,
  GET_COURS_LIST,
  GET_COURS_LIST_FAILED,
  GET_COURS_LIST_SUCCESS,
  GET_LIST_QUESTIONS_COURS,
  GET_LIST_QUESTIONS_COURS_FAILED,
  GET_LIST_QUESTIONS_COURS_SUCCESS,
  GET_ONE_COURS,
  GET_ONE_COURS_FAILED,
  GET_ONE_COURS_SUCCESS,
  GET_SESSIONS_COURS,
  GET_SESSIONS_COURS_FAILED,
  GET_SESSIONS_COURS_SUCCESS,
} from '../types';

export const getListCours: any = (
  data: any,
  callback: any,
  callbackError: any,
) => {
  return (dispatch: (arg0: {type: string; payload?: any}) => any) => {
    dispatch({
      type: GET_COURS_LIST,
    });
    coursSrv
      .getPartnerList(data)
      .then((response: any) => {
        dispatch({
          type: GET_COURS_LIST_SUCCESS,
          payload: response?.data,
        });
        callback(response?.data);
      })
      .catch(e => {
        console.log('GET_COURS_LIST error === ', e);
        dispatch({
          type: GET_COURS_LIST_FAILED,
          payload: e,
        });
        callbackError(e.response);
      });
  };
};
export const getOneCours: any = (
  data: any,
  callback: any,
  callbackError: any,
) => {
  return (dispatch: (arg0: {type: string; payload?: any}) => any) => {
    dispatch({
      type: GET_ONE_COURS,
    });
    coursSrv
      .getOne(data)
      .then((response: any) => {
        dispatch({
          type: GET_ONE_COURS_SUCCESS,
          payload: response?.data,
        });
        callback(response?.data);
      })
      .catch(e => {
        console.log('GET_ONE_COURS error === ', e);
        dispatch({
          type: GET_ONE_COURS_FAILED,
          payload: e,
        });
        callbackError(e.response);
      });
  };
};

export const getListQuestionsCours: any = (
  data: any,
  callback: any,
  callbackError: any,
) => {
  return (dispatch: (arg0: {type: string; payload?: any}) => any) => {
    dispatch({
      type: GET_LIST_QUESTIONS_COURS,
    });
    coursSrv
      .getListQuestions(data)
      .then((response: any) => {
        dispatch({
          type: GET_LIST_QUESTIONS_COURS_SUCCESS,
          payload: response?.data,
        });
        callback(response?.data);
      })
      .catch(e => {
        console.log('GET_LIST_QUESTIONS_COURS error === ', e);
        dispatch({
          type: GET_LIST_QUESTIONS_COURS_FAILED,
          payload: e,
        });
        callbackError(e.response);
      });
  };
};

export const getChaptersCours: any = (
  data: any,
  callback: any,
  callbackError: any,
) => {
  return (dispatch: (arg0: {type: string; payload?: any}) => any) => {
    dispatch({
      type: GET_CHAPTERS_COURS,
    });
    coursSrv
      .getChapters(data)
      .then((response: any) => {
        dispatch({
          type: GET_CHAPTERS_COURS_SUCCESS,
          payload: response?.data,
        });
        callback(response?.data);
      })
      .catch(e => {
        console.log('GET_CHAPTERS_COURS error === ', e);
        dispatch({
          type: GET_CHAPTERS_COURS_FAILED,
          payload: e,
        });
        callbackError(e.response);
      });
  };
};

export const getSessionsCours: any = (
  data: any,
  callback: any,
  callbackError: any,
) => {
  return (dispatch: (arg0: {type: string; payload?: any}) => any) => {
    dispatch({
      type: GET_SESSIONS_COURS,
    });
    coursSrv
      .getSessions(data)
      .then((response: any) => {
        dispatch({
          type: GET_SESSIONS_COURS_SUCCESS,
          payload: response?.data,
        });
        callback(response?.data);
      })
      .catch(e => {
        console.log('GET_SESSIONS_COURS error === ', e);
        dispatch({
          type: GET_SESSIONS_COURS_FAILED,
          payload: e,
        });
        callbackError(e.response);
      });
  };
};
