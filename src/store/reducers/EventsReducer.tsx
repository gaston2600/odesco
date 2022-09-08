import { GET_EVENTS_LIST, GET_EVENTS_LIST_FAILED, GET_EVENTS_LIST_SUCCESS } from "../types/eventsActionsType";

const INITIAL_STATE = {
    events: [],
    loading: false
};

export default (state = INITIAL_STATE, action: { type: any; payload: any }) => {
    switch (action.type) {

        //GET COMMENTS LIST
        case GET_EVENTS_LIST:
            return {
                ...state,
                loading: true
            };
        case GET_EVENTS_LIST_SUCCESS:
            return {
                ...state,
                events: action?.payload?.events,
                loading: false
            };
        case GET_EVENTS_LIST_FAILED:
            return {
                ...state,
                loading: false
            };

        //NOTHING TO DO
        default:
            return {
                ...state,
            };
    }
};