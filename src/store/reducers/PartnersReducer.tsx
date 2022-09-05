import { GET_MY_PARTNERS, GET_MY_PARTNERS_FAILED, GET_MY_PARTNERS_SUCCESS } from "../types/partnersActionTypes";

const INITIAL_STATE = {
    myPartners: [],
    loadingMyPartners: false,
};

export default (state = INITIAL_STATE, action: { type: any; payload: any }) => {
    switch (action.type) {

        //GET COMMENTS LIST
        // case GET_MY_PARTNERS:
        //     return {
        //         ...state,
        //         loadingMyPartners: true
        //     };
        // case GET_MY_PARTNERS_SUCCESS:
        //     return {
        //         ...state,
        //         myPartners: action?.payload,
        //         loadingMyPartners: false
        //     };
        // case GET_MY_PARTNERS_FAILED:
        //     return {
        //         ...state,
        //         loadingMyPartners: false
        //     };


        //NOTHING TO DO
        default:
            return {
                ...state,
            };
    }
};