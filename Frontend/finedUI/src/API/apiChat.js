import apiInstance from './apiInstance';

const api = apiInstance();

//채팅방 가져오기
const apiGetChatRooms = async userId => {
  try {
    const response = await api.get(`/api/chat/rooms/?userId=${userId}`);
    return response;
  } catch (err) {
    console.log(err);
  }
};
export {apiGetChatRooms};
