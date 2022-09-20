import axios from "axios";
import { extractFilters } from "../helpers/extractFilters";
import { urls } from "../utils";

const chatSrv = {
    getAllRooms: (data: any) => {
        return new Promise(async (resolve, reject) => {
            return axios
                .get(`${urls.chat}/rooms/partner/${data?.partner}/${data?.offset || "0"}/${data?.limit || "10"}`)
                // .get(`${urls.comments}/${offset || 0}/${limit || 10}?${extractFilters({ filters })}`)
                .then((resp) => {
                    console.log({ resp });

                    resolve(resp);
                })
                .catch((e) => reject(e));
        });
    },

};

export default chatSrv;