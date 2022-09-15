import axios from "axios";
import { extractFilters } from "../helpers/extractFilters";
import { urls } from "../utils";

const institutionSvr = {
    my: (data: any) => {
        return new Promise(async (resolve, reject) => {
            return axios
                .get(`${urls.mesInstitutions}?${extractFilters({ filters: data?.filters })}`)
                .then((resp) => {
                    // console.log({ resp });

                    resolve(resp);
                })
                .catch((e) => reject(e));
        });
    },
    myPartners: (data: any) => {
        return new Promise(async (resolve, reject) => {
            return axios
                .get(`${urls.users}/${data?.user}/partners`)
                .then((resp) => {
                    // console.log({ resp });

                    resolve(resp);
                })
                .catch((e) => reject(e));
        });
    },
    post: (data: any) => {
        return new Promise(async (resolve, reject) => {
            return axios
                .post(`${urls.configInst}`, data)
                .then((resp) => {
                    console.log({ resp });

                    resolve(resp);
                })
                .catch((e) => reject(e));
        });
    },
    getInstPosts: (data: any) => {
        console.log({data});
        
        return new Promise(async (resolve, reject) => {
            return axios
                .post(`${urls.posts}/filters/${data?.offset || 0}/${data?.limit || 10}`, data?.data)
                .then((resp) => {
                    console.log({ resp });
                    resolve(resp);
                })
                .catch((e) => reject(e));
        });
    },
    getPartnerPosts: (data: any) => {
        return new Promise(async (resolve, reject) => {
            return axios
                .get(`${urls.posts}/partner/${data?.partner}/${data?.offset || 0}/${data?.limit || 10}`, data)
                .then((resp) => {
                    console.log({ resp });
                    resolve(resp);
                })
                .catch((e) => reject(e));
        });
    },

};

export default institutionSvr;