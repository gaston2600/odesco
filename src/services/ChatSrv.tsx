import axios from 'axios';
import {urls} from '../utils';

const chatSrv = {
  getAllRooms: (data: any) => {
    return new Promise(async (resolve, reject) => {
      return axios
        .get(
          `${urls.chat}/rooms/partner/${data?.partner}/${data?.offset || '0'}/${
            data?.limit || '10'
          }`,
        )
        .then(resp => {
          resolve(resp);
        })
        .catch(e => reject(e));
    });
  },
  getOneRoom: (data: any) => {
    return new Promise(async (resolve, reject) => {
      return axios
        .get(
          `${urls.chat}/rooms/${data?.room}/${data?.offset || '0'}/${
            data?.limit || '10'
          }`,
        )
        .then(resp => {
          resolve(resp);
        })
        .catch(e => reject(e));
    });
  },
  postMessage: (data: any) => {
    return new Promise(async (resolve, reject) => {
      return axios
        .post(`${urls.chat}/rooms/${data?.room}/message`, data?.data)
        .then(resp => {
          resolve(resp);
        })
        .catch(e => reject(e));
    });
  },
  markRead: (data: any) => {
    return new Promise(async (resolve, reject) => {
      return axios
        .patch(`${urls.chat}/rooms/${data?.room}/mark-read`, data?.data)
        .then(resp => {
          resolve(resp);
        })
        .catch(e => reject(e));
    });
  },
  initiate: (data: any) => {
    return new Promise(async (resolve, reject) => {
      return axios
        .post(`${urls.chat}/rooms/initiate`, data?.data)
        .then(resp => {
          resolve(resp);
        })
        .catch(e => reject(e));
    });
  },
};

export default chatSrv;
