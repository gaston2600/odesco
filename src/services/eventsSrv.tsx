import axios from 'axios';
import {extractFilters} from '../helpers/extractFilters';
import {urls} from '../utils';

const eventsSrv = {
  getList: (data: any) => {
    return new Promise(async (resolve, reject) => {
      return (
        axios
          .get(`${urls.events}/list?${extractFilters(data)}`)
          // .get(`${urls.comments}/${offset || 0}/${limit || 10}?${extractFilters({ filters })}`)
          .then(resp => {
            // console.log({resp});
            resolve(resp);
          })
          .catch(e => reject(e))
      );
    });
  },
  me: (data: any) => {
    return new Promise(async (resolve, reject) => {
      return (
        axios
          .get(
            `${urls.events}/me/${data?.offset || 0}/${
              data?.limit || 10
            }?${extractFilters(data)}`,
          )
          // .get(`${urls.comments}/${offset || 0}/${limit || 10}?${extractFilters({ filters })}`)
          .then(resp => {
            console.log({resp});
            resolve(resp);
          })
          .catch(e => reject(e))
      );
    });
  },
  subscribe: (data: any) => {
    console.log({data});

    return new Promise(async (resolve, reject) => {
      return axios
        .post(`${urls.events}/subscribe/${data?.id}`, data?.data)
        .then(resp => {
          console.log({resp});
          resolve(resp);
        })
        .catch(e => reject(e));
    });
  },
  post: (data: any) => {
    console.log({data});

    return new Promise(async (resolve, reject) => {
      return axios
        .post(`${urls.events}`, data, {
          headers: {'Content-Type': 'multipart/form-data'},
        })
        .then(resp => {
          console.log({resp});
          resolve(resp);
        })
        .catch(e => reject(e));
    });
  },
};

export default eventsSrv;
