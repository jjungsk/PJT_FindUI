/*
  실종자 정보 CRUD
  by.정세권
*/

import instance from './instance.js';

// api instance 생성
const api = instance();

// ================================= Test ================================================
// 실종자 정보 생성
const apiPostMissingPerson = async missingPersonInfo => {
  try {
    const response = await api.post(``);
    return response;
  } catch (error) {
    return error;
  }
};

// 실종자 정보 조회
const apiGetMissingPerson = async () => {
  try {
    const response = await api.get(`/api/v1/feeds`);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// 실종자 정보 수정
const apiPutMissingPerson = async missingPersonInfo => {
  try {
    const response = await api.put(`${FEED_CONTROLLER}/feeds/cards/${cardId}`);
    return response;
  } catch (error) {
    return error;
  }
};

// 실종자 정보 삭제
const apiDeleteMissingPerson = async missingId => {
  try {
    const response = await api.delete(`url`);
    return response;
  } catch (error) {
    return error;
  }
};

export {
  apiPostMissingPerson,
  apiGetMissingPerson,
  apiPutMissingPerson,
  apiDeleteMissingPerson,
};
