import apiInstance from './apiInstance';
import {getAccessTokenFromKeychain} from '../store/keychain/loginToken';

const api = apiInstance();

//채팅방 가져오기
const apiGetChatRooms = async () => {
  const token = await getAccessTokenFromKeychain();

  try {
    const response = api.get(`/api/chat/rooms`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};
export {apiGetChatRooms};
