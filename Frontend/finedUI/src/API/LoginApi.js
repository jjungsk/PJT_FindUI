import axios from 'axios';

import {MAIN_URL} from '@env';

// import apiInstance from "./apiInstance";
// const api = apiInstance();

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${MAIN_URL}/api/user/login`, {
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

export const validateAccessToken = async accessToken => {
  try {
    const response = await api.post(`/valid`, {
      accessToken,
    });
    return {
      isValid: true,
    };
  } catch (error) {
    console.error(error);
    return {
      isValid: null,
    };
  }
};
