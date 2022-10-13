import axios from 'axios';
import {extractFilters} from '../helpers/extractFilters';
import {urls} from '../utils';

const notificationSrv = {
  getList: (data: any) => {
    return new Promise(async (resolve, reject) => {
      return axios
        .get(
          `${urls.notifications}/list/${data?.offset || 0}/${
            data?.limit || 10
          }?${extractFilters({filters: data?.filters})}`,
        )
        .then(resp => {
          resolve(resp);
        })
        .catch(e => reject(e));
    });
  },
  getOne: (data: any) => {
    return new Promise(async (resolve, reject) => {
      return axios
        .get(`${urls.notifications}/get-one/${data?.id}`)
        .then(resp => {
          resolve(resp);
        })
        .catch(e => reject(e));
    });
  },
};

export default notificationSrv;
