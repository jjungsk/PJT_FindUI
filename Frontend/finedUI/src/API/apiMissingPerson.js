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
  console.log(data);
  const token = await getAccessTokenFromKeychain();
  const imageList = data.imageList;
  const dataFormat = new FormData();
  dataFormat.append('frontImage', null);
  dataFormat.append('otherImage1', imageList >= 2 ? imageList[1] : null);
  dataFormat.append('otherImage2', imageList >= 3 ? imageList[2] : null);
  dataFormat.append('name', data.name);
  dataFormat.append('birthDate', data.birth);
  dataFormat.append('gender', data.gender);
  try {
    const response = api.post('/api/regist/', dataFormat, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'multipart/form-data',
      },
      transformRequest: dataFormat => dataFormat,
    });
    const status = response.status;
    return status;
  } catch (e) {
    console.log(e);
  }
};

// 실종자 정보 생성
const missingRegist = async ({data}) => {
  const token = await getAccessTokenFromKeychain();
  const imageList = data.imageList;
  const dataFormat = new FormData();
  console.log('pos : ', data.pos.lat, data.pos.lng);
  dataFormat.append('frontImage', imageList[0]);
  dataFormat.append('otherImage1', imageList >= 2 ? imageList[1] : null);
  dataFormat.append('otherImage2', imageList >= 3 ? imageList[2] : null);
  dataFormat.append('name', data.name);
  dataFormat.append('birthDate', data.birth);
  dataFormat.append('gender', data.gender);
  dataFormat.append('longitude', data.pos.lat);
  dataFormat.append('latitude', data.pos.lng);
  try {
    const response = api.post('/api/regist/', dataFormat, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'multipart/form-data',
      },
    });
    const status = response.status;
    return status;
  } catch (e) {
    console.log(e);
  }
};

// 실종자 정보 조회 (detail)
const apiGetMissingPerson = async registId => {
  const token = await getAccessTokenFromKeychain();
  try {
<<<<<<< HEAD
    const response = await api.get(`/api/regist/detail?registId=${registId}`);
=======
    const response = await api.get(`/api/regist/detail/${registId}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
>>>>>>> dev-front
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
