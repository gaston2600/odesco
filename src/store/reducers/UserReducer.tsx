import configAxios from '../../services';
import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  SELECT_SPACE,
  LOGOUT,
  GET_PROFILE_USER,
  GET_PROFILE_USER_SUCCESS,
  GET_PROFILE_USER_FAILED,
} from '../types';

const INITIAL_STATE = {
  userLoading: false,
  checkSessionLoading: false,
  sessionChecked: false,
  // user, token,
  user: null,
  token: null,
  error_login: false,
  auth: null,
  owner: '',
  locationRecived: false,
  currentLocation: null,
  loadingCurrentLocation: false,
  grantedAccesLocation: false,
  myProfile: null,
  workingDays: null,
  deviceToken: '',
  defaultPartner: '',
  selectedSpace: null,
};

export default (state = INITIAL_STATE, action: {type: any; payload: any}) => {
  switch (action.type) {
    //USER LOGIN
    case LOGIN_USER:
      return {
        ...state,
        userLoading: true,
        error_login: false,
      };
    case LOGIN_USER_SUCCESS:
      const {user, token} = action.payload;
      return {
        ...state,
        user,
        token,
        auth: user && token !== '',
        userLoading: false,
        // defaultPartner: user?.ref_codes?.filter((v: any) => String(v?.ref_code)?.startsWith("partner"))?.[0]?._id
      };
    case LOGIN_USER_FAILED:
      return {
        ...state,
        error_login: true,
        userLoading: false,
      };

    case GET_PROFILE_USER:
      return {
        ...state,
        userLoading: true,
        error_login: false,
      };
    case GET_PROFILE_USER_SUCCESS:
      return {
        ...state,
        user: action?.payload?.user,
        userLoading: false,
      };
    case GET_PROFILE_USER_FAILED:
      return {
        ...state,
        error_login: true,
        userLoading: false,
      };

    case LOGOUT:
      return {
        ...state,
        user: null,
        token: '',
        auth: false,
        userLoading: false,
      };

    case SELECT_SPACE:
      return {
        ...state,
        selectedSpace: action.payload,
      };

    //NOTHING TO DO
    default:
      return {
        ...state,
      };
  }
};
