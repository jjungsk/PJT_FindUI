import axios from 'axios';
import {TEST_URL, MAIN_URL} from '@env';

const apiInstance = () => {
  const instance = axios.create({
    baseURL: 'http://j8a108.p.ssafy.io:8080',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });

  return instance;
};

export default apiInstance;
