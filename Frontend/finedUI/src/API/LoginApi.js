import instance from "./instance";

export const login = async (email, password) => {
  try {
    const response = await instance.post(`/login`, {
      email,
      password,
    });
    return {
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken,
      status: response.data.status
    };
  } catch (error) {
    console.error(error);
    return {
      accessToken: null,
      refreshToken: null,
      status: null
    };
  }
};


export const validateAccessToken = async (accessToken) => {
  try {
    const response = await instance.post(`/valid`, {
      accessToken
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
}