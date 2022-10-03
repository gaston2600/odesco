import {LOGIN_USER_SUCCESS} from '../types';
import {
  GET_MY_INSTITUTIONS,
  GET_MY_INSTITUTIONS_FAILED,
  GET_MY_INSTITUTIONS_SUCCESS,
} from '../types/institutionsActionTypes';
import {
  GET_MY_PARTNERS,
  GET_MY_PARTNERS_FAILED,
  GET_MY_PARTNERS_SUCCESS,
} from '../types/partnersActionTypes';

const INITIAL_STATE = {
  myInstitutions: [],
  myPartners: [],
  loading: false,
};

export default (state = INITIAL_STATE, action: {type: any; payload: any}) => {
  switch (action.type) {
    //GET MY INSTITUTION LIST
    case GET_MY_INSTITUTIONS:
      return {
        ...state,
        loading: true,
      };
    case GET_MY_INSTITUTIONS_SUCCESS:
      return {
        ...state,
        myInstitutions: action?.payload?.institutions,
        loading: false,
      };
    case GET_MY_INSTITUTIONS_FAILED:
      return {
        ...state,
        loading: false,
      };
    case GET_MY_PARTNERS:
      return {
        ...state,
        loading: true,
      };
    case GET_MY_PARTNERS_SUCCESS:
      return {
        ...state,
        myPartners: action?.payload?.partners,
        defaultPartner: action?.payload?.partners?.filter((v: any) =>
          String(v?.ref_code)?.startsWith('partner'),
        )?.[0]?._id,
        loading: false,
      };
    case GET_MY_PARTNERS_FAILED:
      return {
        ...state,
        loading: false,
      };
    case LOGIN_USER_SUCCESS:
      console.log({action});

      return {
        ...state,
        loading: false,
        defaultPartner: action?.payload?.partner?._id,
      };

    //NOTHING TO DO
    default:
      return {
        ...state,
      };
  }
};
