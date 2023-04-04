import apiInstance from "./apiInstance";
import { getAccessTokenFromKeychain, getRefreshTokenFromKeychain, saveAccessToKeychain, saveRefreshToKeychain } from "../store/keychain/loginToken";

const api = apiInstance();

// 회원가입
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

// access token 유효성 검사
export const checkAcess = async () => {
  try{
    const token = await getAccessTokenFromKeychain();
    const response = await api.post(`/api/user/token`, {}, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
    return response
  } catch (error) {
    console.error(error)
    return error
  }
}

// refresh token 유효성 검사
export const checkRefresh = async () => {
  try{
    const token = await getRefreshTokenFromKeychain();
    const response = await api.post(`/api/user/refresh`, {}, {
      headers: {
        'Refresh': 'Bearer ' + token
      }
    });
    if (response.status === 200) {
      saveAccessToKeychain(response.data.accessToken)
    }
    return response
  } catch (error) {
    console.error(error)
    return error
  }
}

