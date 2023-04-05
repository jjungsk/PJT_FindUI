/*
  Home Screen의
  1. 유저가 등록된 실종자 (get)
  2. notice 공지사항 (get)
  3. 전체 실종자 목록 (get)
*/

import apiInstance from './apiInstance';

const api = apiInstance();

// (1) 해당 User가 등록한 실종자 정보
const apiGetUserRegistMissingPersons = async userId => {
  try {
    const response = api.get(`/api/regist?userId=${userId}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// (2) notices
const apiGetNotices = async () => {};

// (3) 실종자 정보 조회 (all)
const apiGetMissingPersonAll = async userId => {
  try {
    const response = await api.get(`/api/regist?userId=${userId}`);
    return response;
  } catch (error) {
    return error;
  }
};

export {apiGetUserRegistMissingPersons, apiGetNotices, apiGetMissingPersonAll};
