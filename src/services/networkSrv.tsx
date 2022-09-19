import axios from "axios";
import { extractFilters } from "../helpers/extractFilters";
import { urls } from "../utils";

const networkSrv = {
    getOne: (data: any) => {
        return new Promise(async (resolve, reject) => {
            return axios
                .get(`${urls.schoolingNetwork}/get-one/${data?.partner}`)
                .then((resp) => {
                    console.log({ resp });

                    resolve(resp);
                })
                .catch((e) => reject(e));
        });
    },
    

};

export default networkSrv;