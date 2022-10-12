import trainingSrv from '../../services/trainingSrv';
import {
  CREATE_NEW_TRAINING,
  CREATE_NEW_TRAINING_FAILED,
  CREATE_NEW_TRAINING_SUCCESS,
  GET_TRAININGS_LIST,
  GET_TRAININGS_LIST_FAILED,
  GET_TRAININGS_LIST_SUCCESS,
} from '../types/trainingActionsTypes';

export const getTrainingList: any = (
  data: any,
  callback: any,
  callbackError: any,
) => {
  return (dispatch: (arg0: {type: string; payload?: any}) => any) => {
    dispatch({
      type: GET_TRAININGS_LIST,
    });

    trainingSrv
      .getList(data)
      .then((response: any) => {
        console.log({response});

        dispatch({
          type: GET_TRAININGS_LIST_SUCCESS,
          payload: response?.data,
        });
        callback(response?.data);
      })
      .catch(e => {
        console.log('GET_TRAININGS_LIST error === ', e);
        dispatch({
          type: GET_TRAININGS_LIST_FAILED,
          payload: e,
        });
        callbackError(e);
      });
  };
};

export const createTraining: any = (
  data: any,
  callback: any,
  callbackError: any,
) => {
  const frm = new FormData();
  frm.append('name', data.name);
  frm.append('cover', data.cover);
  frm.append('theme', data.theme);
  frm.append('date_start', data.date_start);
  frm.append('date_end', data.date_end);
  frm.append('price', data.price);
  frm.append('duration', data.duration);
  frm.append('desc', data.desc);
  frm.append('currency', data.currency);
  frm.append('is_public', data.is_public);
  frm.append('is_free', data.is_free);
  frm.append('is_online', data.is_online);
  frm.append('is_hybrid', data.is_hybrid);
  frm.append('is_presential', data.is_presential);
  frm.append('user', data.user);
  frm.append('inst_id', data.inst_id);
  if (data?.is_presential || data?.is_hybrid)
    frm.append('address', data.address);
  if (data?.is_online || data?.is_hybrid) frm.append('link', data.link);
  if (data?.name !== '') {
    if (data?.days && data?.days.length)
      frm.append('days', JSON.stringify(data?.days));
    if (data?.periods && data?.periods.length)
      frm.append('periods', JSON.stringify(data?.periods));
  }
  console.log('frm :>> ', frm);
  return (dispatch: (arg0: {type: string; payload?: any}) => any) => {
    dispatch({
      type: CREATE_NEW_TRAINING,
    });

    trainingSrv
      .post(frm)
      .then((response: any) => {
        console.log({response});

        dispatch({
          type: CREATE_NEW_TRAINING_SUCCESS,
          payload: response?.data,
        });
        callback(response?.data);
      })
      .catch(e => {
        console.log('CREATE_NEW_TRAINING error === ', e);
        dispatch({
          type: CREATE_NEW_TRAINING_FAILED,
          payload: e,
        });
        callbackError(e);
      });
  };
};
