import moment from 'moment';
import commentsSrv from '../../services/commentsSrv';
import eventsSrv from '../../services/eventsSrv';
import {
  GET_EVENTS_LIST,
  GET_EVENTS_LIST_FAILED,
  GET_EVENTS_LIST_SUCCESS,
  GET_MY_EVENTS_LIST,
  GET_MY_EVENTS_LIST_FAILED,
  GET_MY_EVENTS_LIST_SUCCESS,
  POST_EVENT,
  POST_EVENT_FAILED,
  POST_EVENT_SUCCESS,
  SUBSCRIBE_EVENT,
  SUBSCRIBE_EVENT_FAILED,
  SUBSCRIBE_EVENT_SUCCESS,
} from '../types/eventsActionsType';

export const getEvents: any = (
  data: any,
  callback: any,
  callbackError: any,
) => {
  return (dispatch: (arg0: {type: string; payload?: any}) => any) => {
    dispatch({
      type: GET_EVENTS_LIST,
    });
    eventsSrv
      .getList(data)
      .then((response: any) => {
        dispatch({
          type: GET_EVENTS_LIST_SUCCESS,
          payload: response?.data,
        });
        callback(response?.data);
      })
      .catch(e => {
        console.log('login error === ', e);
        dispatch({
          type: GET_EVENTS_LIST_FAILED,
          payload: e,
        });
        callbackError(e.response);
      });
  };
};

export const getMyEvents: any = (
  data: any,
  callback: any,
  callbackError: any,
) => {
  return (dispatch: (arg0: {type: string; payload?: any}) => any) => {
    dispatch({
      type: GET_MY_EVENTS_LIST,
    });
    eventsSrv
      .me(data)
      .then((response: any) => {
        dispatch({
          type: GET_MY_EVENTS_LIST_SUCCESS,
          payload: response?.data,
        });
        callback(response?.data);
      })
      .catch(e => {
        console.log('login error === ', e);
        dispatch({
          type: GET_MY_EVENTS_LIST_FAILED,
          payload: e,
        });
        callbackError(e.response);
      });
  };
};

export const subscribeEvent: any = (
  data: any,
  callback: any,
  callbackError: any,
) => {
  return (dispatch: (arg0: {type: string; payload?: any}) => any) => {
    dispatch({
      type: SUBSCRIBE_EVENT,
    });
    eventsSrv
      .subscribe(data)
      .then((response: any) => {
        dispatch({
          type: SUBSCRIBE_EVENT_SUCCESS,
          payload: response?.data,
        });
        callback(response?.data);
      })
      .catch(e => {
        console.log('subscribe error === ', e);
        dispatch({
          type: SUBSCRIBE_EVENT_FAILED,
          payload: e,
        });
        callbackError(e.response);
      });
  };
};

export const createEvent: any = (
  data: any,
  callback: any,
  callbackError: any,
) => {
  const frm = new FormData();
  frm.append('name', data.name);
  frm.append('cover', data.cover);
  frm.append('type', data.type);
  frm.append('date_start', moment(data.date_start).toString());
  frm.append('date_end', moment(data.date_end).toString());
  frm.append(
    'deadline_subscription',
    moment(data.deadline_subscription).toString(),
  );
  frm.append('program', data.program);
  frm.append('desc', data.desc);
  frm.append('is_public', data.is_public);
  frm.append('is_online', data.is_online);
  frm.append('is_hybrid', data.is_hybrid);
  frm.append('is_presential', data.is_presential);
  if (data.address) {
    frm.append('address', data.address);
  }
  if (data.link) {
    frm.append('link', data.link);
  }

  if (data.user && data.user !== '') {
    frm.append('user', data.user);
  }
  if (data.inst_id && data.inst_id !== '') {
    frm.append('inst_id', data.inst_id);
  }
  if (data.partner && data.partner !== '') {
    frm.append('partner', data.partner);
  }

  console.log('------------------', {frm});

  return (dispatch: (arg0: {type: string; payload?: any}) => any) => {
    dispatch({
      type: POST_EVENT,
    });
    eventsSrv
      .post(frm)
      .then((response: any) => {
        dispatch({
          type: POST_EVENT_SUCCESS,
          payload: response?.data,
        });
        callback(response?.data);
      })
      .catch(e => {
        console.log('POST_EVENT error === ', e);
        dispatch({
          type: POST_EVENT_FAILED,
          payload: e,
        });
        callbackError(e.response);
      });
  };
};
