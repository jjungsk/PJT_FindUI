/*
  Token Interceptor
  by.정세권
*/

// state token
import {getAccessTokenFromKeychain} from '../store/keychain/loginToken';

const apiInterceptor = instance => {
  // Add a request interceptor
  instance.interceptors.request.use(
    async config => {
      // instance 전역 설정
      const authTokenAccessToken = await getAccessTokenFromKeychain();
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
