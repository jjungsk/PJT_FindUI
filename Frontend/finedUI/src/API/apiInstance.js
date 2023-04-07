import axios from 'axios';
import {MAIN_URL} from '@env';
import apiInterceptor from './apiInterceptor';

console.log(MAIN_URL);
const apiInstance = () => {
  const instance = axios.create({
    baseURL: MAIN_URL,
    headers: {
      Authorization: 'Bearer ',
      'Content-type': 'application/json;charset=UTF-8',
    },
  });

  return apiInterceptor(instance);
};

export default apiInstance;
