import axios from "axios";
import { extractFilters } from "../helpers/extractFilters";
import { urls } from "../utils";

const postsSrv = {
    getList: ({ limit, offset, filters }: any) => {
        return new Promise(async (resolve, reject) => {
            return axios
                .get(`${urls.postsList}/${offset || 0}/${limit || 10}?${extractFilters({ filters })}`)
                .then((resp) => {
                    resolve(resp);
                })
                .catch((e) => reject(e));
        });
    },
    likePost: ({ post, data }: any) => {
        return new Promise(async (resolve, reject) => {
            return axios
                .post(`${urls.likes}/${post}`, data)
                .then((resp) => {
                    resolve(resp);
                })
                .catch((e) => reject(e));
        });
    },
};

export default postsSrv;