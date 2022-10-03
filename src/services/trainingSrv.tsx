import axios from 'axios';
import {extractFilters} from '../helpers/extractFilters';
import {urls} from '../utils';

const trainingSrv = {
  getList: ({limit, offset, filters}: any) => {
    return new Promise(async (resolve, reject) => {
      return axios
        .get(
          `${urls.trainings}/me/${offset || 0}/${limit || 10}?${extractFilters({
            filters,
          })}`,
        )
        .then(resp => {
          resolve(resp);
        })
        .catch(e => reject(e));
    });
  },
};

export default trainingSrv;
