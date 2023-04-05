/*
  Kakao Map (좌표 -> 주소 반환)
  위도 경도 좌표 값을 주변 String type으로 주소 반환
  by.정세권
*/

import apiInstance from './apiInstance';

const api = apiInstance();

const apiGetAddress = async ({lng, lat}) => {
  try {
    const response = await api.get(`/api/map?lng=${lng}&lat=${lat}`);
    console.log('map : ', response.status);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default apiGetAddress;
