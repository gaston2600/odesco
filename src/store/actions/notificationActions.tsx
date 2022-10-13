import notificationSrv from '../../services/notificationSrv';
import {
  GET_LIST_NOTIFICATIONS,
  GET_LIST_NOTIFICATIONS_FAILED,
  GET_LIST_NOTIFICATIONS_SUCCESS,
  GET_ONE_NOTIFICATION,
  GET_ONE_NOTIFICATION_FAILED,
  GET_ONE_NOTIFICATION_SUCCESS,
} from '../types/notificationActionsTypes';

export const getMyNotifications: any = (data: any) => {
  return (dispatch: (arg0: {type: string; payload?: any}) => any) => {
    dispatch({
      type: GET_LIST_NOTIFICATIONS,
    });
    notificationSrv
      .getList(data)
      .then((response: any) => {
        console.log({response});

        dispatch({
          type: GET_LIST_NOTIFICATIONS_SUCCESS,
          payload: response?.data,
        });
        // callback(response?.data);
      })
      .catch(e => {
        console.log('GET_LIST_NOTIFICATIONS error === ', e);
        dispatch({
          type: GET_LIST_NOTIFICATIONS_FAILED,
          payload: e,
        });
        // callbackError(e.response);
      });
  };
};
export const getOneNotifcation: any = (data: any) => {
  return (dispatch: (arg0: {type: string; payload?: any}) => any) => {
    dispatch({
      type: GET_ONE_NOTIFICATION,
    });

    notificationSrv
      .getOne(data)
      .then((response: any) => {
        console.log('GET_ONE_NOTIFICATION', {response});

        dispatch({
          type: GET_ONE_NOTIFICATION_SUCCESS,
          payload: response?.data,
        });
        // callback(response?.data);
      })
      .catch(e => {
        console.log('GET_ONE_NOTIFICATION error === ', e);
        dispatch({
          type: GET_ONE_NOTIFICATION_FAILED,
          payload: e,
        });
        // callbackError(e.response);
      });
  };
};
