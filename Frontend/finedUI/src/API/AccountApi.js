import apiInstance from "./apiInstance";

const api = apiInstance();

export const signup = async (name, address, email, password, phoneNumber) => {
  try {
    const response = await api.post(`/user/create`, {
      name,
      address,
      email,
      password,
      phoneNumber
    });
    return {
      response
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
