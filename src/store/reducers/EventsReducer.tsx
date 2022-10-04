import {LOGOUT} from '../types';
import {
  GET_EVENTS_LIST,
  GET_EVENTS_LIST_FAILED,
  GET_EVENTS_LIST_SUCCESS,
  GET_MY_EVENTS_LIST,
  GET_MY_EVENTS_LIST_FAILED,
  GET_MY_EVENTS_LIST_SUCCESS,
} from '../types/eventsActionsType';

const INITIAL_STATE = {
  events: [],
  myEvents: [],
  loading: false,
};

export default (state = INITIAL_STATE, action: {type: any; payload: any}) => {
  switch (action.type) {
    //GET COMMENTS LIST
    case GET_EVENTS_LIST:
      return {
        ...state,
        loading: true,
      };
    case GET_EVENTS_LIST_SUCCESS:
      return {
        ...state,
        events: action?.payload?.events,
        loading: false,
      };
    case GET_EVENTS_LIST_FAILED:
      return {
        ...state,
        loading: false,
      };
    //GET COMMENTS LIST
    case GET_MY_EVENTS_LIST:
      return {
        ...state,
        loading: true,
      };
    case GET_MY_EVENTS_LIST_SUCCESS:
      return {
        ...state,
        myEvents: action?.payload?.events,
        loading: false,
      };
    case GET_MY_EVENTS_LIST_FAILED:
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
