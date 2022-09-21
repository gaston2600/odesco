import axios from 'axios';
import {extractFilters} from '../helpers/extractFilters';
import {urls} from '../utils';

const teachersSrv = {
  getList: ({limit, offset, filters}: any) => {
    return new Promise(async (resolve, reject) => {
      return axios
        .get(
          `${urls.schoolingPrivateTeachers}/list/${offset || 0}/${
            limit || 10
          }?${extractFilters({filters})}`,
        )
        .then(resp => {
          resolve(resp);
        })
        .catch(e => reject(e));
    });
  },
  getOne: ({teacher}: any) => {
    return new Promise(async (resolve, reject) => {
      return axios
        .get(`${urls.schoolingTeachers}/get-one/${teacher}`)
        .then(resp => {
          resolve(resp);
        })
        .catch(e => reject(e));
    });
  },

  subscribe: ({teacher, data}: any) => {
    return new Promise(async (resolve, reject) => {
      return axios
        .post(`${urls.schoolingTeachers}/subscribe/${teacher}`, data)
        .then(resp => {
          resolve(resp);
        })
        .catch(e => reject(e));
    });
  },
};

export default teachersSrv;
