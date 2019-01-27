import axios from 'axios';
// import vue from '@/main';

const http = axios.create({ baseURL: process.env.VUE_APP_BASE_URL });


const requestUse = config => config;

const requestError = async error => Promise.reject(error);

const responseUse = response => response;

const responseError = error => Promise.reject(error);

http.interceptors.request.use(requestUse, requestError);
http.interceptors.response.use(responseUse, responseError);


export default http;
