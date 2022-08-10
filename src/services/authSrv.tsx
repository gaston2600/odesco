import axios from "axios";

const authSrv = {
    login: (
        email: String = "",
        password: String = "",
    ) => {
        return new Promise((resolve, reject) => {
            return axios
                .post("/login", { email, password })
                .then((resp) => {
                    resolve(resp);
                })
                .catch((e) => reject(e));
        });
    },

};

export default authSrv;