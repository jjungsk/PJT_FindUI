import axios from 'axios';
import {TEST_URL, MAIN_URL} from '@env';

const apiInstance = () => {
  const instance = axios.create({
    baseURL: 'http://10.0.2.2:8080',
    headers: {
      'Content-type': 'application/json;charset=UTF-8',
    },
  });

  return instance;
};

export default apiInstance;
