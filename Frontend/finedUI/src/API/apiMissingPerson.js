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

import apiInstance from './instance.js';

const api = apiInstance();

// ================================= Test ================================================
// 실종자 정보 생성
const apiPostMissingPerson = async missingPersonInfo => {
  try {
    const response = await api.post(`/api/regist`, missingPersonInfo);
    return response;
  } catch (error) {
    return error;
  }
};

// 실종자 정보 조회
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
  apiPostMissingPerson,
  apiGetMissingPerson,
  apiPutMissingPerson,
  apiDeleteMissingPerson,
};
