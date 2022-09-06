import institutionSvr from "../../services/institutionSrv";
import { GET_MY_INSTITUTIONS, GET_MY_INSTITUTIONS_FAILED, GET_MY_INSTITUTIONS_SUCCESS } from "../types/institutionsActionTypes";

export const getMyInstitutions = (
    data: any,
) => {
    return (dispatch: (arg0: { type: string; payload?: any }) => any) => {
        dispatch({
            type: GET_MY_INSTITUTIONS,
        });

        institutionSvr
            .my(data)
            .then((response: any) => {
                // console.log({ response });

                dispatch({
                    type: GET_MY_INSTITUTIONS_SUCCESS,
                    payload: response?.data,
                });
                // callback(response?.data);
            })
            .catch((e) => {
                console.log("login error === ", e);
                dispatch({
                    type: GET_MY_INSTITUTIONS_FAILED,
                    payload: e,
                });
                // callbackError(e.response);
            });
    };
};