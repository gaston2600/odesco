import axios from "axios";
import { extractFilters } from "../helpers/extractFilters";
import { urls } from "../utils";

const commentsSrv = {
    getPostComments: (data: any) => {
        return new Promise(async (resolve, reject) => {
            return axios
                .get(`${urls.comments}/${data?.post}`)
                // .get(`${urls.comments}/${offset || 0}/${limit || 10}?${extractFilters({ filters })}`)
                .then((resp) => {
                    console.log({ resp });

                    resolve(resp);
                })
                .catch((e) => reject(e));
        });
    },
    post: (data: any) => {
        return new Promise(async (resolve, reject) => {
            return axios
                .get(`${urls.comments}/${data?.post}`, { data: data?.data })
                .then((resp) => {
                    console.log({ resp });

                    resolve(resp);
                })
                .catch((e) => reject(e));
        });
    },
};

export default commentsSrv;