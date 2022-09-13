import axios from "axios";
import { extractFilters } from "../helpers/extractFilters";
import { urls } from "../utils";

const invitationsSrv = {
    getList: (data: any) => {
        return new Promise(async (resolve, reject) => {
            return axios
                .get(`${urls.invitations}/list/partner/${data?.partner}/${data?.offset || 0}/${data?.limit || 10}?${extractFilters({ filters: data?.filters })}`)
                .then((resp) => {
                    console.log({ resp });

                    resolve(resp);
                })
                .catch((e) => reject(e));
        });
    },
};

export default invitationsSrv;