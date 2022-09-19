import networkSrv from "../../services/networkSrv";
import { GET_ONE_NETWORK, GET_ONE_NETWORK_FAILED, GET_ONE_NETWORK_SUCCESS } from "../types/networkActionsType";

export const getNetwork = (
    data: any,
) => {
    return (dispatch: (arg0: { type: string; payload?: any }) => any) => {
        dispatch({
            type: GET_ONE_NETWORK,
        });

        networkSrv
            .getOne(data)
            .then((response: any) => {
                // console.log({ response });

                dispatch({
                    type: GET_ONE_NETWORK_SUCCESS,
                    payload: response?.data,
                });
                // callback(response?.data);
            })
            .catch((e) => {
                console.log("GET_ONE_NETWORK error === ", e);
                dispatch({
                    type: GET_ONE_NETWORK_FAILED,
                    payload: e,
                });
                // callbackError(e.response);
            });
    };
};
