import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,

} from "../types";

import authService from "../../services/authSrv";
import configAxios from "../../services";
import authSrv from "../../services/authSrv";

export const login = (
    email: any,
    password: any,
    callback: any,
    callbackError: any
) => {
    return (dispatch: (arg0: { type: string; payload?: any }) => any) => {
        dispatch({
            type: LOGIN_USER,
        });

        // console.log({ email, password, deviceId, platform });

        authSrv
            .login(email, password)
            .then(async (response: any) => {
                console.log({ response });

                const { token, user } = response.data.data;

                dispatch({
                    type: LOGIN_USER_SUCCESS,
                    payload: { token, user },
                });
                callback({ token, user });
            })
            .catch((e) => {
                console.log("login error === ", e.response);
                dispatch({
                    type: LOGIN_USER_FAILED,
                    payload: e,
                });
                callbackError(e.response);
            });
    };
};

};
