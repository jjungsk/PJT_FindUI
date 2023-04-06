import apiInstance from './apiInstance';
import {getAccessTokenFromKeychain} from '../store/keychain/loginToken';

const api = apiInstance();

//채팅방 가져오기
const apiGetProfile = async () => {
  try {
    const token = await getAccessTokenFromKeychain();

    const response = await api.get(`/api/chat/image/user`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};
export {apiGetProfile};
