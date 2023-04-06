import apiInstance from "./apiInstance";
import { deleteTokensFromKeychain, getAccessTokenFromKeychain, getRefreshTokenFromKeychain, saveAccessToKeychain, saveRefreshToKeychain } from "../store/keychain/loginToken";
import { reset } from "../components/navigator/NavigationService";
import { isLoginState } from "../store/atoms/userState";
import { setRecoil } from "recoil-nexus";

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

// refresh token 유효성 검사
export const checkRefresh = async () => {
  try{
    const accesstoken = await getAccessTokenFromKeychain();
    const token = await getRefreshTokenFromKeychain();
    const response = await api.post(`/api/user/token/refresh`, {}, {
      headers: {
        'Authorization': 'Bearer ' + accesstoken,
        'Refresh': 'Bearer ' + token
      }
    });
    if (response.status === 200) {
      saveAccessToKeychain(response.data.accessToken)
      return true
    } else {
      setRecoil(isLoginState, false)
      deleteTokensFromKeychain();
      reset('LoginPage')
      return false
    }
  } catch (error) {
    console.error(error)
    return error
  }
}

// access token 유효성 검사
export const checkAcess = async () => {
  try{
    const token = await getAccessTokenFromKeychain();
    const response = await api.post(`/api/user/token`, {}, {
      headers: {
        'Authorization': 'Bearer ' + token
      }  
    });  
    if (response.status === 200 ) {
      return true
    }
    
    if (response.status === 451) {
      const response = await checkRefresh()
      return response
    }

    if (response.status === 401) {
      setRecoil(isLoginState, false)
      deleteTokensFromKeychain();
      reset('LoginPage')
      return false
    }
  } catch (error) {
    console.error(error)
    return error
  }  
}  