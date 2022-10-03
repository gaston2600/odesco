import axios from 'axios';
import {urls} from '../utils';

const authSrv = {
  login: (email: String = '', password: String = '') => {
    return new Promise((resolve, reject) => {
      return axios
        .post(`${urls.login}`, {email, pass: password})
        .then(resp => {
          resolve(resp);
        })
        .catch(e => reject(e));
    });
  },
  changePassword: (data: any) => {
    return new Promise((resolve, reject) => {
      return axios
        .patch(`${urls.users}/edit-one/password/${data?.user}`, data?.data)
        .then(resp => {
          resolve(resp);
        })
        .catch(e => reject(e));
    });
  },
  
  verifPhone: (data: any) => {
    const formData = new FormData();
    if (data?.userId) {
      formData?.append('userId', data?.userId);
    }
    return new Promise((resolve, reject) => {
      return axios
        .post(`${urls.users}/send-phone-token`, formData, {
          headers: {'Content-Type': 'multipart/form-data'},
        })
        .then(resp => {
          resolve(resp);
        })
        .catch(e => reject(e));
    });
  },
  confirmPhoneToken: (data: any) => {
    const formData = new FormData();
    if (data?.userId) {
      formData?.append('userId', data?.userId);
    }
    if (data?.token) {
      formData?.append('token', data?.token);
    }
    return new Promise((resolve, reject) => {
      return axios
        .post(`${urls.users}/verify-phone-token`, formData, {
          headers: {'Content-Type': 'multipart/form-data'},
        })
        .then(resp => {
          resolve(resp);
        })
        .catch(e => reject(e));
    });
  },
  verifEmail: (data: any) => {
    const formData = new FormData();
    if (data?.userId) {
      formData?.append('userId', data?.userId);
    }
    return new Promise((resolve, reject) => {
      return axios
        .post(`${urls.users}/send-email-token`, formData, {
          headers: {'Content-Type': 'multipart/form-data'},
        })
        .then(resp => {
          resolve(resp);
        })
        .catch(e => reject(e));
    });
  },
  confirmEmailToken: (data: any) => {
    const formData = new FormData();
    if (data?.userId) {
      formData?.append('userId', data?.userId);
    }
    if (data?.token) {
      formData?.append('token', data?.token);
    }
    return new Promise((resolve, reject) => {
      return axios
        .post(`${urls.users}/verify-email-token`, formData, {
          headers: {'Content-Type': 'multipart/form-data'},
        })
        .then(resp => {
          resolve(resp);
        })
        .catch(e => reject(e));
    });
  },
};

export default authSrv;
