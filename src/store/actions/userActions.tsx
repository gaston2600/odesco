import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  EDIT_USER,
  EDIT_USER_FAILED,
  EDIT_USER_SUCCESS,
  SELECT_SPACE,
} from '../types';

import authService from '../../services/authSrv';
import configAxios from '../../services';
import authSrv from '../../services/authSrv';
import userSrv from '../../services/userSrv';

export const login = (
  email: any,
  password: any,
  callback: any,
  callbackError: any,
) => {
  return (dispatch: (arg0: {type: string; payload?: any}) => any) => {
    dispatch({
      type: LOGIN_USER,
    });

    // console.log({ email, password, deviceId, platform });

    authSrv
      .login(email, password)
      .then(async (response: any) => {
        console.log({response});

        const {token, user, partner} = response.data;

        dispatch({
          type: LOGIN_USER_SUCCESS,
          payload: {token, user, partner},
        });
        callback({token, user});
      })
      .catch(e => {
        console.log('login error === ', e);
        dispatch({
          type: LOGIN_USER_FAILED,
          payload: e,
        });
        callbackError(e.response);
      });
  };
};

export const editUser = (data: any, callback: any, callbackError: any) => {
  return (dispatch: (arg0: {type: string; payload?: any}) => any) => {
    dispatch({
      type: EDIT_USER,
    });
    userSrv
      .edit(data)
      .then(async (response: any) => {
        dispatch({
          type: EDIT_USER_SUCCESS,
          payload: response?.data,
        });
        callback(response?.data);
      })
      .catch(e => {
        console.log('editUser error === ', e);
        dispatch({
          type: EDIT_USER_FAILED,
          payload: e,
        });
        callbackError(e.response);
      });
  };
};

export const selectSpace: any = (data: any) => {
  return (dispatch: (arg0: {type: string; payload?: any}) => any) => {
    dispatch({
      type: SELECT_SPACE,
      payload: data,
    });
  };
};
