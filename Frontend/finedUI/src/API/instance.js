import axios from 'axios';
import {TEST_URL} from '@env';

const apiInstance = () => {
  const instance = axios.create({
    baseURL: TEST_URL,
    headers: {
      'Content-type': 'application/json;charset=UTF-8',
    },
  });

  return instance;
};

export default apiInstance;
