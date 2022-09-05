import axios from "axios";
import { extractFilters } from "../helpers/extractFilters";
import { urls } from "../utils";

const institutionSvr = {
    my: (data: any) => {
        return new Promise(async (resolve, reject) => {
            return axios
                .get(`${urls.mesInstitutions}?${extractFilters({ filters: data?.filters })}`)
                .then((resp) => {
                    console.log({ resp });

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
                    console.log({ resp });

                    resolve(resp);
                })
                .catch((e) => reject(e));
        });
    },
};

export default institutionSvr;