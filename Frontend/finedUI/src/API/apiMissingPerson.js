/*
  실종자 정보 CRUD

  component 사용 방법
  import {api Method} from '../../~~/apiMissingPerson.js';

  const auto = async () => {
    await apiGetMissingPerson(registId)
      .then(({data}) => {
        console.log(data.data);
      })
      .catch(error => {
        console.log('실패');
        console.log(error);
      });
  };
  auto();

  by.정세권
*/

import {getAccessTokenFromKeychain} from '../store/keychain/loginToken.js';
import apiInstance from './apiInstance.js';

const api = apiInstance();

// ================================= Test ================================================
// 사전 등록 정보 생성
const preRegist = async ({data}) => {
  const token = getAccessTokenFromKeychain();
  const imageList = data.imageList;
  try {
    const response = api.post(
      '/api/regist',
      (data = {
        frontImage: imageList[0],
        otherImage1: imageList >= 2 ? imageList[1] : null,
        otherImage2: imageList >= 3 ? imageList[2] : null,
        name: data.name,
        birthDate: data.birth,
        gender: data.gender,
        isMissing: false,
      }),
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      },
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};

// 실종자 정보 생성
const missingRegist = async ({data}) => {
  const imageList = data.imageList;
  try {
    const response = api.post(
      '/api/regist',
      (data = {
        userId: data.userId,
        frontImage: imageList[0],
        otherImage1: imageList >= 2 ? imageList[1] : null,
        otherImage2: imageList >= 3 ? imageList[2] : null,
        name: data.name,
        birthDate: data.birth,
        gender: data.gender,
        isMissing: true,
        longitude: data.pos.lat,
        latitude: data.pos.lng,
      }),
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};

// 실종자 정보 조회 (detail)
const apiGetMissingPerson = async registId => {
  try {
    const response = await api.get(`/api/regist/detail/${registId}`);
    return response;
  } catch (error) {
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
const apiDeleteMissingPerson = async registId => {
  try {
    const response = await api.delete(`/api/regist?registId=${registId}`);
    return response;
  } catch (error) {
    return error;
  }
};

export {
  preRegist,
  missingRegist,
  apiGetMissingPerson,
  apiPutMissingPerson,
  apiDeleteMissingPerson,
};
