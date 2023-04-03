import apiInstance from "./apiInstance";
import { getAccessTokenFromKeychain, getRefreshTokenFromKeychain, saveAccessToKeychain, saveRefreshToKeychain } from "../store/keychain/loginToken";

const api = apiInstance();

// 마이페이지 정보 변경
export const modifyInfo = async (name, address, email, phoneNumber) => {
  try {
    const token = await getAccessTokenFromKeychain();
    const response = await api.patch(`/api/user/mypage`, {
      name,
      address,
      email,
      phoneNumber
    }, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
    return response
  } catch (error) {
    console.error(error);
    return error
  }
};

// 회원 정보 불러오기
export const getUserInfo = async () => {
  try {
    const token = await getAccessTokenFromKeychain();
    const response = await api.get(`/api/user/mypage`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
    return response.data
  } catch (error) {
    console.error(error);
    return error
  }
};

// 회원 탈퇴하기
export const deleteUser = async () => {
  try {
    const token = await getAccessTokenFromKeychain();
    const response = await api.delete(`/api/user/withdrwal`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
    return response.data
  } catch (error) {
    console.error(error);
    return error
  }
};