import axios from 'axios';
import {extractFilters} from '../helpers/extractFilters';
import {urls} from '../utils';

const institutionSvr = {
  my: (data: any) => {
    return new Promise(async (resolve, reject) => {
      return axios
        .get(
          `${urls.mesInstitutions}?${extractFilters({filters: data?.filters})}`,
        )
        .then(resp => {
          // console.log({ resp });

          resolve(resp);
        })
        .catch(e => reject(e));
    });
  },
  myPartners: (data: any) => {
    return new Promise(async (resolve, reject) => {
      return axios
        .get(`${urls.users}/${data?.user}/partners`)
        .then(resp => {
          // console.log({ resp });

          resolve(resp);
        })
        .catch(e => reject(e));
    });
  },
  post: (data: any) => {
    return new Promise(async (resolve, reject) => {
      return axios
        .post(`${urls.configInst}`, data)
        .then(resp => {
          console.log({resp});

          resolve(resp);
        })
        .catch(e => reject(e));
    });
  },
  getInstPosts: (data: any) => {
    console.log({data});

    return new Promise(async (resolve, reject) => {
      return axios
        .post(
          `${urls.posts}/filters/${data?.offset || 0}/${data?.limit || 10}`,
          data?.data,
        )
        .then(resp => {
          console.log({resp});
          resolve(resp);
        })
        .catch(e => reject(e));
    });
  },
  getPartnerPosts: (data: any) => {
    return new Promise(async (resolve, reject) => {
      return axios
        .get(
          `${urls.posts}/partner/${data?.partner}/${data?.offset || 0}/${
            data?.limit || 10
          }`,
          data,
        )
        .then(resp => {
          console.log({resp});
          resolve(resp);
        })
        .catch(e => reject(e));
    });
  },
  getOne: (data: any) => {
    return new Promise(async (resolve, reject) => {
      return axios
        .get(`${urls.configInst}/get-one/${data?.inst_id}`)
        .then(resp => {
          console.log({resp});
          resolve(resp);
        })
        .catch(e => reject(e));
    });
  },
  getTeachers: (data: any) => {
    return new Promise(async (resolve, reject) => {
      return axios
        .get(
          `${urls.schoolingTeachers}/list/${data?.inst_id}/${
            data?.offset || 0
          }/${data?.limit || 10}`,
        )
        .then(resp => {
          console.log({resp});
          resolve(resp);
        })
        .catch(e => reject(e));
    });
  },

  getAll: (data: any) => {
    return new Promise(async (resolve, reject) => {
      return axios
        .get(
          `${urls.configInst}/list/${data?.offset || 0}/${
            data?.limit || 10
          }?${extractFilters({filters: data?.filters})}`,
        )
        .then(resp => {
          resolve(resp);
        })
        .catch(e => reject(e));
    });
  },
  getAllFilters: (data: any) => {
    return new Promise(async (resolve, reject) => {
      return axios
        .post(
          `${urls.configInst}/filters/${data?.offset || 0}/${
            data?.limit || 10
          }`,
          data?.data,
        )
        .then(resp => {
          resolve(resp);
        })
        .catch(e => reject(e));
    });
  },

  subscribe: (data: any) => {
    return new Promise(async (resolve, reject) => {
      return axios
        .post(`${urls.configInst}/subscribe/${data?.id}`, data?.data)
        .then(resp => {
          resolve(resp);
        })
        .catch(e => reject(e));
    });
  },
};

export default institutionSvr;
