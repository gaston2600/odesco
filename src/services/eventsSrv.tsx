import axios from "axios";
import { extractFilters } from "../helpers/extractFilters";
import { urls } from "../utils";

const eventsSrv = {
    getList: (data: any) => {
        return new Promise(async (resolve, reject) => {
            return axios
                .get(`${urls.events}/list?${extractFilters(data)}`)
                // .get(`${urls.comments}/${offset || 0}/${limit || 10}?${extractFilters({ filters })}`)
                .then((resp) => {
                    console.log({ resp });
                    resolve(resp);
                })
                .catch((e) => reject(e));
        });
    },
    subscribe: (data: any) => {
        return new Promise(async (resolve, reject) => {
            return axios
                .post(`${urls.events}/subscribe/${data?.id}`, data?.data)
                .then((resp) => {
                    console.log({ resp });
                    resolve(resp);
                })
                .catch((e) => reject(e));
        });
    },
};

export default eventsSrv;