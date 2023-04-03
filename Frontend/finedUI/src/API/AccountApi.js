import apiInstance from "./apiInstance";

const api = apiInstance();

export const signup = async (name, address, email, password, phoneNumber) => {
  try {
    const response = await api.post(`/api/user/create`, {
      name,
      address,
      email,
      password,
      phoneNumber
    });
    return response
  } catch (error) {
    console.error(error);
    return error
  }
};

export const modifyInfo = async (name, address, email, phoneNumber) => {
  try {
    const response = await api.patch(`/api/user/mypage`, {
      name,
      address,
      email,
      phoneNumber
    });
    return response
  } catch (error) {
    console.error(error);
    return error
  }
};
