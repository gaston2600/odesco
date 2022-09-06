import axios from "axios";
import { urls } from "../utils";

const authSrv = {
    login: (
        email: String = "",
        password: String = "",
    ) => {
        return new Promise((resolve, reject) => {
            return axios
                .post(`${urls.login}`, { email, pass :password })
                .then((resp) => {
                    resolve(resp);
                })
                .catch((e) => reject(e));
        });
    },

};

export default authSrv;