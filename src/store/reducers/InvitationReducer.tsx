import { GET_INVITATIONS_LIST, GET_INVITATIONS_LIST_FAILED, GET_INVITATIONS_LIST_SUCCESS } from "../types";

const INITIAL_STATE = {
    invitations: [],
    loading: false,
};

export default (state = INITIAL_STATE, action: { type: any; payload: any }) => {
    switch (action.type) {

        //GET MY INSTITUTION LIST
        case GET_INVITATIONS_LIST:
            return {
                ...state,
                loading: true
            };
        case GET_INVITATIONS_LIST_SUCCESS:
            return {
                ...state,
                invitations: action?.payload?.invitations,
                loading: false
            };
        case GET_INVITATIONS_LIST_FAILED:
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