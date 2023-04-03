import axios from 'axios';
import {TEST_URL, MAIN_URL} from '@env';

const apiInstance = () => {
  const instance = axios.create({
    baseURL: MAIN_URL,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });

  return instance;
};

export default apiInstance;
