import axios from 'axios';
import store from '@/store';

const http = axios.create({ baseURL: process.env.VUE_APP_BASE_URL });

const requestUse = config => config;
const requestError = async error => Promise.reject(error);

const responseUse = response => response;
const responseError = error => {
  const payload = {};
  if (error.message === 'Network Error') {
    payload.code = 'NETWORK';
  } else if (error.response) {
    const { response } = error;
    const { url, method } = response.config;
    payload.code = 'HTTP';
    payload.data = { statusCode: response.status, url, method: method.toUpperCase() };
  }

  store.commit('errors/add', payload);
  Promise.reject(error);
};

http.interceptors.request.use(requestUse, requestError);
http.interceptors.response.use(responseUse, responseError);

// -------------------------

export const getGalleryCategories = () => http.get('/galleries');
export const getGalleryPictures = id => http.get(`/galleries/${id}/pictures`);

export const getDevice = code => http.get(`/devices/${code}`);

export const sendPicture = (id, data) => http.post(`/devices/${id}/pictures`, data);

export default {
  getGalleryCategories,
  getGalleryPictures,
  getDevice,
  sendPicture
};
