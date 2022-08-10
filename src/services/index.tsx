import axios from "axios";
import { urls } from "../utils";
const configAxios = (token: String) => {
    // const UNAUTHORIZED = 401;

    // DEV
    axios.defaults.baseURL = urls.baseURL;

    axios.defaults.timeout = 10000;

    // axios.defaults.withCredentials = true;
    if (token && token !== "") {
        axios.defaults.headers.common = { Authorization: `bearer ${token}` };
    }

    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            console.log(error.toString());

            return Promise.reject(error);
        }
    );
};

export default configAxios;
