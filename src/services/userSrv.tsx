import axios from 'axios';
import {urls} from '../utils';

const userSrv = {
  edit: (data: any) => {
    return new Promise((resolve, reject) => {
      return axios
        .patch(`${urls.users}/edit-one/${data?.id}`, data?.data)
        .then(resp => {
          resolve(resp);
        })
        .catch(e => reject(e));
    });
  },
};

export default userSrv;
