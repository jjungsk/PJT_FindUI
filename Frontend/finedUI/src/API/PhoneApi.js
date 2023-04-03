import apiInstance from "./apiInstance";

const api = apiInstance();

export const sendVerifyCode = async (phoneNumber) => {
  try {
    const response = await api.post(`/api/user/phoneauth`, {
      phoneNumber,
    });
    return response
  } catch (error) {
    console.error(error);
    return error
  }
};

export const verifyPhoneNumber = async (phoneNumber, code) => {
  try {
    const response = await api.post(`/api/user/phoneconfirm`, {
      phoneNumber,
      code,
    });
    return response
  } catch (error) {
    console.error(error);
    return error
  }
};