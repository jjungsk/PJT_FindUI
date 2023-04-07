import axios from 'axios';

import {MAIN_URL} from '@env';
import apiInstance from './apiInstance';

// import apiInstance from "./apiInstance";
const api = apiInstance();

export const login = async (email, password) => {
  try {
    const response = await api.post(`/api/user/login`, {
      email,
      password,
    });
    return {
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken,
      status: response.status,
    };
  } catch (error) {
    console.error(error);
    return {
      accessToken: null,
      refreshToken: null,
      status: null,
    };
  }
};

// 소셜 로그인
export const socialLogin = async (social) => {
  try {
    console.log(social)
    const response = await api.get(`/oauth2/authorization/${social}?redirect_url=com.finedui://LoginPage`);
    console.log(response.data)
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};