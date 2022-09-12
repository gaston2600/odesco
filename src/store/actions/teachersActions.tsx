import teachersSrv from "../../services/teachersSrv";
import { GET_ONE_TEACHER, GET_ONE_TEACHER_FAILED, GET_ONE_TEACHER_SUCCESS, GET_TEACHERS_LIST, GET_TEACHERS_LIST_FAILED, GET_TEACHERS_LIST_SUCCESS } from "../types/teachersActionsType";

export const getTeachersList = (
    data: any,
    callback: any,
    callbackError: any
) => {
    return (dispatch: (arg0: { type: string; payload?: any }) => any) => {
        dispatch({
            type: GET_TEACHERS_LIST,
        });

        teachersSrv
            .getList(data)
            .then((response: any) => {
                // console.log({ response });

                dispatch({
                    type: GET_TEACHERS_LIST_SUCCESS,
                    payload: response?.data,
                });
                callback(response?.data);
            })
            .catch((e) => {
                console.log("login error === ", e);
                dispatch({
                    type: GET_TEACHERS_LIST_FAILED,
                    payload: e,
                });
                callbackError(e)
            });
    };
};

export const getOneTeacher = (
    data: any,
    callback: any,
    callbackError: any
) => {
    return (dispatch: (arg0: { type: string; payload?: any }) => any) => {
        dispatch({
            type: GET_ONE_TEACHER,
        });

        teachersSrv
            .getOne(data)
            .then((response: any) => {
                dispatch({
                    type: GET_ONE_TEACHER_SUCCESS,
                    payload: response?.data,
                });
                callback(response?.data);
            })
            .catch((e) => {
                console.log("et_one_teacher error === ", e);
                dispatch({
                    type: GET_ONE_TEACHER_FAILED,
                    payload: e,
                });
                callbackError(e)
            });
    };
};