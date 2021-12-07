import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import evns from '../config/env';
import {navigate} from '../navigations/mainNavigation';
import {LOGOUT} from '../constants/routeNames';

let headers = {};

const axiosInstance = axios.create({
  baseURL: evns.DEV_BACKEND_URL,
  headers,
});

axiosInstance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  response =>
    new Promise((resolve, reject) => {
      resolve(response);
    }),

  err => {
    if (!err.response) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }

    if (err.response.status === 403) {
      navigate(LOGOUT);
    } else {
      return new Promise((response, reject) => {
        reject(error);
      });
    }
  },
);

export default axiosInstance;
