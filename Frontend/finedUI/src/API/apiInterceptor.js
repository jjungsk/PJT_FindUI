/*
  Token Interceptor
  by.정세권
*/

import {Alert} from 'react-native';

// check token
import {checkAcess, checkRefresh} from './AccountApi';

// state token
import {
  getAccessTokenFromKeychain,
  getRefreshTokenFromKeychain,
  saveAccessToKeychain,
  saveRefreshToKeychain,
} from '../store/keychain/loginToken';

const apiInterceptor = instance => {
  // Add a request interceptor
  instance.interceptors.request.use(
    config => {
      // instance 전역 설정
      const authTokenAccessToken = getAccessTokenFromKeychain();
      const newConfig = config;
      newConfig.headers.Authorization = `Bearer ${authTokenAccessToken}`;
      return newConfig;
    },
    error => {
      console.log('인터셉터 에러', error);
      Promise.reject(error);
    },
  );

  // Add a response interceptor
  // instance.interceptors.response.use(
  //   function (response) {
  //     return response;
  //   },
  //   function (error) {
  //     return Promise.reject(error);
  //   }
  // );

  return instance;
};

export default apiInterceptor;
