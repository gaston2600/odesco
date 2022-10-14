import coursSrv from '../../services/coursSrv';
import {
  GET_COURS_LIST,
  GET_COURS_LIST_FAILED,
  GET_COURS_LIST_SUCCESS,
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
