import {
} from "../types";
import { GET_ONE_TEACHER, GET_ONE_TEACHER_FAILED, GET_ONE_TEACHER_SUCCESS, GET_TEACHERS_LIST, GET_TEACHERS_LIST_FAILED, GET_TEACHERS_LIST_SUCCESS } from "../types/teachersActionsType";

const INITIAL_STATE = {
    teachers: [],
    count: 0,
    loading: false
};

export default (state = INITIAL_STATE, action: { type: any; payload: any }) => {
    switch (action.type) {
        //TEACHERS LIST
        case GET_TEACHERS_LIST:
            return {
                ...state,
                loading: true
            };
        case GET_TEACHERS_LIST_SUCCESS:
            return {
                ...state,
                teachers: action?.payload?.teachers,
                loading: false
            };
        case GET_TEACHERS_LIST_FAILED:
            return {
                ...state,
                loading: false
            };
        // GET ONE TEACHER
        case GET_ONE_TEACHER:
            return {
                ...state,
                loading: true
            };
        case GET_ONE_TEACHER_SUCCESS:
            return {
                ...state,
                loading: false
            };
        case GET_ONE_TEACHER_FAILED:
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