import {LOGOUT} from '../types';
import {
  GET_ONE_NETWORK,
  GET_ONE_NETWORK_FAILED,
  GET_ONE_NETWORK_SUCCESS,
} from '../types/networkActionsType';

const INITIAL_STATE = {
  members: [],
  pendings: [],
  requests: [],
  loading: false,
};

export default (state = INITIAL_STATE, action: {type: any; payload: any}) => {
  switch (action.type) {
    case GET_ONE_NETWORK:
      return {
        ...state,
        loading: true,
      };
    case GET_ONE_NETWORK_SUCCESS:
      return {
        ...state,
        members: action?.payload?.network?.members,
        pendings: action?.payload?.network?.pendings,
        requests: action?.payload?.network?.requests,
        loading: false,
      };
    case GET_ONE_NETWORK_FAILED:
      return {
        ...state,
        loading: false,
      };
    case LOGOUT:
      return {
        INITIAL_STATE,
      };
    //NOTHING TO DO
    default:
      return {
        ...state,
      };
  }
};
