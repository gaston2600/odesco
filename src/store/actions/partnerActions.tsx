import institutionSvr from '../../services/institutionSrv';
import partnerSrv from '../../services/partnerSrv';
import {
  GET_MY_INSTITUTIONS,
  GET_MY_INSTITUTIONS_FAILED,
  GET_MY_INSTITUTIONS_SUCCESS,
} from '../types/institutionsActionTypes';
import {
  EDIT_PARTNER,
  EDIT_PARTNER_FAILED,
  EDIT_PARTNER_SUCCESS,
  GET_LIST_PARTNERS,
  GET_LIST_PARTNERS_FAILED,
  GET_LIST_PARTNERS_SUCCESS,
  GET_MY_PARTNERS,
  GET_MY_PARTNERS_FAILED,
  GET_MY_PARTNERS_SUCCESS,
  GET_ONE_PARTNER,
  GET_ONE_PARTNER_FAILED,
  GET_ONE_PARTNER_SUCCESS,
} from '../types/partnersActionTypes';

export const getMyPartners = (data: any) => {
  return (dispatch: (arg0: {type: string; payload?: any}) => any) => {
    dispatch({
      type: GET_MY_PARTNERS,
    });
    institutionSvr
      .myPartners(data)
      .then((response: any) => {
        // console.log({ response });

        dispatch({
          type: GET_MY_PARTNERS_SUCCESS,
          payload: response?.data,
        });
        // callback(response?.data);
      })
      .catch(e => {
        console.log('GET_MY_PARTNERS error === ', e);
        dispatch({
          type: GET_MY_PARTNERS_FAILED,
          payload: e,
        });
        // callbackError(e.response);
      });
  };
};
export const getPartnersList = (
  data: any,
  callback: any,
  callbackError: any,
) => {
  return (dispatch: (arg0: {type: string; payload?: any}) => any) => {
    dispatch({
      type: GET_LIST_PARTNERS,
    });
    partnerSrv
      .getList(data)
      .then((response: any) => {
        dispatch({
          type: GET_LIST_PARTNERS_SUCCESS,
          payload: response?.data,
        });
        callback(response?.data);
      })
      .catch(e => {
        console.log('GET_LIST_PARTNERS error === ', e);
        dispatch({
          type: GET_LIST_PARTNERS_FAILED,
          payload: e,
        });
        callbackError(e.response);
      });
  };
};
export const getOnePartner = (data: any) => {
  return (dispatch: (arg0: {type: string; payload?: any}) => any) => {
    dispatch({
      type: GET_ONE_PARTNER,
    });

    partnerSrv
      .getOne(data)
      .then((response: any) => {
        // console.log({ response });

        dispatch({
          type: GET_ONE_PARTNER_SUCCESS,
          payload: response?.data,
        });
        // callback(response?.data);
      })
      .catch(e => {
        console.log('GET_ONE_PARTNER error === ', e);
        dispatch({
          type: GET_ONE_PARTNER_FAILED,
          payload: e,
        });
        // callbackError(e.response);
      });
  };
};

export const editPartner = (data: any, callback: any, callbackError: any) => {
  return (dispatch: (arg0: {type: string; payload?: any}) => any) => {
    dispatch({
      type: EDIT_PARTNER,
    });

    partnerSrv
      .edit(data)
      .then((response: any) => {
        // console.log({ response });

        dispatch({
          type: EDIT_PARTNER_SUCCESS,
          payload: response?.data,
        });
        callback(response?.data);
      })
      .catch(e => {
        console.log('EDIT_PARTNER error === ', e);
        dispatch({
          type: EDIT_PARTNER_FAILED,
          payload: e,
        });
        callbackError(e.response);
      });
  };
};
