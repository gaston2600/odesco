import axios from 'axios';
import {urls} from '../utils';

const userSrv = {
  getProfile: (data: any) => {
    return new Promise((resolve, reject) => {
      return axios
        .get(`${urls.users}/${data?.user}`)
        .then(resp => {
          resolve(resp);
        })
        .catch(e => reject(e));
    });
  },
  edit: (data: any) => {
    return new Promise((resolve, reject) => {
      return axios
        .patch(`${urls.users}/edit-one/${data?.id}`, data?.data, {
          headers: {'Content-Type': 'multipart/form-data'},
        })
        .then(resp => {
          resolve(resp);
        })
        .catch(e => reject(e));
    });
  },
};

export default userSrv;
