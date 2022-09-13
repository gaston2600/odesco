import axios from "axios";
import { extractFilters } from "../helpers/extractFilters";
import { urls } from "../utils";

const postsSrv = {
    getList: ({ limit, offset, partner, filters }: any) => {
        return new Promise(async (resolve, reject) => {
            return axios
                .get(`${urls.posts}/list/${partner}/${offset || 0}/${limit || 10}?${extractFilters({ filters })}`)
                .then((resp) => {
                    // console.log({ resp });
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
    getTeacherPosts: ({ limit, offset, partner, filters }: any) => {
        return new Promise(async (resolve, reject) => {
            return axios
                .get(`${urls.posts}/partner/${partner}/${offset || 0}/${limit || 10}?${extractFilters({ filters })}`)
                .then((resp) => {
                    console.log({ resp });
                    resolve(resp);
                })
                .catch((e) => reject(e));
        });
    },
};

export default postsSrv;