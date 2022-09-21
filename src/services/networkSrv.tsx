import axios from 'axios';
import {extractFilters} from '../helpers/extractFilters';
import {urls} from '../utils';

const networkSrv = {
  getOne: (data: any) => {
    return new Promise(async (resolve, reject) => {
      return axios
        .get(`${urls.schoolingNetwork}/get-one/${data?.partner}`)
        .then(resp => {
          resolve(resp);
        })
        .catch(e => reject(e));
    });
  },
  acceptMember: (data: any) => {
    return new Promise(async (resolve, reject) => {
      return axios
        .post(
          `${urls.schoolingNetwork}/accept-member/${data?.partner}`,
          data?.data,
        )
        .then(resp => {
          resolve(resp);
        })
        .catch(e => reject(e));
    });
  },
  addMember: (data: any) => {
    return new Promise(async (resolve, reject) => {
      return axios
        .post(
          `${urls.schoolingNetwork}/add-member/${data?.partner}`,
          data?.data,
        )
        .then(resp => {
          resolve(resp);
        })
        .catch(e => reject(e));
    });
  },
};

export default networkSrv;
