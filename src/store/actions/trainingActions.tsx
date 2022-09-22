import trainingSrv from '../../services/trainingSrv';
import {
  GET_TRAININGS_LIST,
  GET_TRAININGS_LIST_FAILED,
  GET_TRAININGS_LIST_SUCCESS,
} from '../types/trainingActionsTypes';

export const getTrainingList = (
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
