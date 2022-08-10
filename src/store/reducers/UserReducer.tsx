import configAxios from "../../services";
import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
} from "../types";

const INITIAL_STATE = {
    userLoading: false,
    checkSessionLoading: false,
    sessionChecked: false,
    // user, token,
    user: null,
    token: null,
    error_login: false,
    auth: null,
    owner: "",
    locationRecived: false,
    currentLocation: null,
    loadingCurrentLocation: false,
    grantedAccesLocation: false,
    myProfile: null,
    workingDays: null,
    deviceToken: "",
};

export default (state = INITIAL_STATE, action: { type: any; payload: any }) => {
    switch (action.type) {
        //USER LOGIN
        case LOGIN_USER:
            return {
                ...state,
                userLoading: true,
                error_login: false,
            };
        case LOGIN_USER_SUCCESS:
            const { user, token } = action.payload;

            return {
                ...state,
                user,
                token,
                auth: user && token !== "",
                userLoading: false,
            };
        case LOGIN_USER_FAILED:
            return {
                ...state,
                error_login: true,
                userLoading: false,
            };


        //NOTHING TO DO
        default:
            return {
                ...state,
            };
    }
};