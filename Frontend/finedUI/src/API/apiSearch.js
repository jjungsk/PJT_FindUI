/*
검색 화면의
1. 등록된 이미지 검색 (post)
*/

import {getAccessTokenFromKeychain} from '../store/keychain/loginToken';
import {MAIN_URL} from '@env';
import axios from 'axios';
import apiInstance from './apiInstance';

const api = apiInstance();

// 등록된 이미지 검색
const apiSearchMissingPersons = async ({data}) => {
  try {
    const token = await getAccessTokenFromKeychain();
    const image = data.image;
    const formData = new FormData();
    formData.append('limit', data.limit);
    formData.append('offset', data.offset);
    formData.append('img', {
      uri: image.uri,
      type: image.type,
      name: image.name,
    });

    const response = await axios.post(
      MAIN_URL + '/api/chat/image/search',
      formData,
      {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    const status = response.data.status;
    console.log('search Complete : ', status);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export {apiSearchMissingPersons};
