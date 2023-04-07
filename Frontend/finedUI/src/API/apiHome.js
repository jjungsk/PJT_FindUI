/*
  Home Screen의
  1. 유저가 등록된 실종자 (get)
  2. notice 공지사항 (get)
  3. 전체 실종자 목록 (get)
*/

import {setRecoil} from 'recoil-nexus';
import {
  noticeInfoState,
  missingShortInfoState,
  missingLongInfoState,
} from '../store/atoms/InfoState';

import apiInstance from './apiInstance';

const api = apiInstance();

// (1) 해당 User가 등록한 실종자 정보
const apiGetUserRegistMissingPersons = async () => {
  try {
    const response = api.get(`/api/regist/user`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// (2) notices
const apiGetNotices = async () => {
  try {
    const response = await api.get(`/api/notice/all`);
    setRecoil(noticeInfoState, response.data.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// (3) 실종자 정보 조회 (all)
const apiGetMissingPersonAll = async () => {
  try {
    const response = await api.get(`/api/regist`);
    setRecoil(missingShortInfoState, response.data.data);
    setRecoil(missingLongInfoState, response.data.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export {apiGetUserRegistMissingPersons, apiGetNotices, apiGetMissingPersonAll};
