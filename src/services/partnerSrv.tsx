import axios from "axios";
import { extractFilters } from "../helpers/extractFilters";
import { urls } from "../utils";

const partnerSrv = {
    getList: (data: any) => {
        return new Promise(async (resolve, reject) => {
            return axios
                .get(`${urls.schoolingPartners}/list/${data?.offset || 0}/${data?.limit || 10}?${extractFilters({ filters: data?.filters })}`)
                .then((resp) => {
                    console.log({ resp });

                    resolve(resp);
                })
                .catch((e) => reject(e));
        });
    },
    getOne: (data: any) => {
        return new Promise(async (resolve, reject) => {
            return axios
                .get(`${urls.schoolingPartners}/get-one/${data?.partner}`)
                .then((resp) => {
                    console.log({ resp });

                    resolve(resp);
                })
                .catch((e) => reject(e));
        });
    },
    edit: (data: any) => {
        return new Promise(async (resolve, reject) => {
            return axios
                .patch(`${urls.schoolingPartners}/edit-one/${data?.partner}`,data?.data)
                .then((resp) => {
                    console.log({ resp });

                    resolve(resp);
                })
                .catch((e) => reject(e));
        });
    },

};

export default partnerSrv;