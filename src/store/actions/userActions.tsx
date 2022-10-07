import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  EDIT_USER,
  EDIT_USER_FAILED,
  EDIT_USER_SUCCESS,
  SELECT_SPACE,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILED,
  VERIF_PHONE,
  VERIF_PHONE_SUCCESS,
  VERIF_PHONE_FAILED,
  CONFIRM_PHONE_TOKEN,
  CONFIRM_PHONE_TOKEN_SUCCESS,
  CONFIRM_PHONE_TOKEN_FAILED,
  VERIF_EMAIL,
  VERIF_EMAIL_SUCCESS,
  VERIF_EMAIL_FAILED,
  CONFIRM_EMAIL_TOKEN,
  CONFIRM_EMAIL_TOKEN_SUCCESS,
  CONFIRM_EMAIL_TOKEN_FAILED,
  LOGOUT,
  GET_PROFILE_USER,
  GET_PROFILE_USER_SUCCESS,
  GET_PROFILE_USER_FAILED,
} from '../types';

import authService from '../../services/authSrv';
import configAxios from '../../services';
import authSrv from '../../services/authSrv';
import userSrv from '../../services/userSrv';

export const login: any = (
  email: any,
  password: any,
  deviceId: any,
  callback: any,
  callbackError: any,
) => {
  return (dispatch: (arg0: {type: string; payload?: any}) => any) => {
    dispatch({
      type: LOGIN_USER,
    });

    // console.log({ email, password, deviceId, platform });

    authSrv
      .login(email, password, deviceId)
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

export const logout: any = () => {
  return (dispatch: (arg0: {type: string; payload?: any}) => any) => {
    dispatch({
      type: LOGOUT,
    });
  };
};

export const changePassword: any = (
  data: any,
  callback: any,
  callbackError: any,
) => {
  return (dispatch: (arg0: {type: string; payload?: any}) => any) => {
    dispatch({
      type: CHANGE_PASSWORD,
    });
    authSrv
      .changePassword(data)
      .then(async (response: any) => {
        console.log({response});
        dispatch({
          type: CHANGE_PASSWORD_SUCCESS,
          payload: response?.data,
        });
        callback(response?.data);
      })
      .catch(e => {
        console.log('CHANGE_PASSWORD error === ', e);
        dispatch({
          type: CHANGE_PASSWORD_FAILED,
          payload: e,
        });
        callbackError(e.response);
      });
  };
};

export const verifPhone: any = (
  data: any,
  callback: any,
  callbackError: any,
) => {
  return (dispatch: (arg0: {type: string; payload?: any}) => any) => {
    dispatch({
      type: VERIF_PHONE,
    });
    authSrv
      .verifPhone(data)
      .then(async (response: any) => {
        console.log({response});
        dispatch({
          type: VERIF_PHONE_SUCCESS,
          payload: response?.data,
        });
        callback(response?.data);
      })
      .catch(e => {
        console.log('VERIF_PHONE error === ', e);
        dispatch({
          type: VERIF_PHONE_FAILED,
          payload: e,
        });
        callbackError(e.response);
      });
  };
};

export const confirmPhoneToken: any = (
  data: any,
  callback: any,
  callbackError: any,
) => {
  return (dispatch: (arg0: {type: string; payload?: any}) => any) => {
    dispatch({
      type: CONFIRM_PHONE_TOKEN,
    });
    authSrv
      .confirmPhoneToken(data)
      .then(async (response: any) => {
        console.log({response});
        dispatch({
          type: CONFIRM_PHONE_TOKEN_SUCCESS,
          payload: response?.data,
        });
        callback(response?.data);
      })
      .catch(e => {
        console.log('CONFIRM_PHONE_TOKEN error === ', e);
        dispatch({
          type: CONFIRM_PHONE_TOKEN_FAILED,
          payload: e,
        });
        callbackError(e.response);
      });
  };
};

export const verifEmailToken: any = (
  data: any,
  callback: any,
  callbackError: any,
) => {
  return (dispatch: (arg0: {type: string; payload?: any}) => any) => {
    dispatch({
      type: VERIF_EMAIL,
    });
    authSrv
      .verifEmail(data)
      .then(async (response: any) => {
        console.log({response});
        dispatch({
          type: VERIF_EMAIL_SUCCESS,
          payload: response?.data,
        });
        callback(response?.data);
      })
      .catch(e => {
        console.log('VERIF_EMAIL error === ', e);
        dispatch({
          type: VERIF_EMAIL_FAILED,
          payload: e,
        });
        callbackError(e.response);
      });
  };
};

export const confirmEmailToken: any = (
  data: any,
  callback: any,
  callbackError: any,
) => {
  return (dispatch: (arg0: {type: string; payload?: any}) => any) => {
    dispatch({
      type: CONFIRM_EMAIL_TOKEN,
    });
    authSrv
      .confirmEmailToken(data)
      .then(async (response: any) => {
        console.log({response});
        dispatch({
          type: CONFIRM_EMAIL_TOKEN_SUCCESS,
          payload: response?.data,
        });
        callback(response?.data);
      })
      .catch(e => {
        console.log('CONFIRM_EMAIL_TOKEN error === ', e);
        dispatch({
          type: CONFIRM_EMAIL_TOKEN_FAILED,
          payload: e,
        });
        callbackError(e.response);
      });
  };
};

export const getProfile: any = (
  data: any,
  callback: any,
  callbackError: any,
) => {
  return (dispatch: (arg0: {type: string; payload?: any}) => any) => {
    dispatch({
      type: GET_PROFILE_USER,
    });
    userSrv
      .getProfile(data)
      .then(async (response: any) => {
        dispatch({
          type: GET_PROFILE_USER_SUCCESS,
          payload: response?.data,
        });
        callback(response?.data);
      })
      .catch(e => {
        console.log('GET_PROFILE_USER error === ', e);
        dispatch({
          type: GET_PROFILE_USER_FAILED,
          payload: e,
        });
        callbackError(e.response);
      });
  };
};

export const editUser: any = (data: any, callback: any, callbackError: any) => {
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
