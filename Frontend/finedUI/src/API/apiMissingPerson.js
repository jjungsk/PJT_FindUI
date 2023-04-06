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
import {Platform} from 'react-native';
import {getAccessTokenFromKeychain} from '../store/keychain/loginToken.js';
import apiInstance from './apiInstance.js';
import {MAIN_URL} from '@env';
import axios from 'axios';
import ImageBase64 from 'react-native-image-base64';

const api = apiInstance();

// ================================= Test ================================================
// 사전 등록 정보 생성
const preRegist = async ({data}) => {
  console.log(data);
  const token = await getAccessTokenFromKeychain();
  const imageList = data.imageList;
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('birthDate', data.birth);
  formData.append('gender', data.gender);

  formData.append('frontImage', {
    uri: imageList[0].uri,
    type: imageList[0].type,
    name: imageList[0].name,
  });
  if (imageList.length >= 2) {
    formData.append('otherImage1', {
      uri: imageList[1].uri,
      type: imageList[1].type,
      name: imageList[1].name,
    });
  }
  if (imageList.length >= 3) {
    formData.append('otherImage2', {
      uri: imageList[2].uri,
      type: imageList[2].type,
      name: imageList[2].name,
    });
  }

  try {
    console.log('(apiMissingPerson.js) preRegist formData : ', formData);
    const response = await axios.post(MAIN_URL + '/api/regist/', formData, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'multipart/form-data',
      },
    });
    const status = response.data.status;
    console.log('status', status);
    return status;
  } catch (e) {
    console.log(e);
  }
};

// const preRegist = async ({ data }) => {
//   console.log(data);
//   const token = await getAccessTokenFromKeychain();
//   const imageList = data.imageList;
//   const formData = new FormData();
//   formData.append('name', data.name);
//   formData.append('birthDate', data.birth);
//   formData.append('gender', data.gender);

//   if (imageList.length >= 1) {
//     try {
//       const base64 = await ImageBase64.getBase64String(imageList[0].uri);
//       formData.append('frontImage', {
//         uri: `data:${imageList[0].type};base64,${base64}`,
//         type: imageList[0].type,
//         name: imageList[0].name,
//       });
//     } catch (e) {
//       console.log(e);
//     }
//   }
//   if (imageList.length >= 2) {
//     try {
//       const base64 = await ImageBase64.getBase64String(imageList[1].uri);
//       formData.append('otherImage1', {
//         uri: `data:${imageList[1].type};base64,${base64}`,
//         type: imageList[1].type,
//         name: imageList[1].name,
//       });
//     } catch (e) {
//       console.log(e);
//     }
//   }
//   if (imageList.length >= 3) {
//     try {
//       const base64 = await ImageBase64.getBase64String(imageList[2].uri);
//       formData.append('otherImage2', {
//         uri: `data:${imageList[2].type};base64,${base64}`,
//         type: imageList[2].type,
//         name: imageList[2].name,
//       });
//     } catch (e) {
//       console.log(e);
//     }
//   }

//   try {
//     const response = await axios.post(MAIN_URL + '/api/regist/', formData, {
//       headers: {
//         Authorization: 'Bearer ' + token,
//         'Content-Type': 'multipart/form-data',
//       },
//     });
//     const status = response.data.status;
//     console.log('status', status);
//     return status;
//   } catch (e) {
//     console.log(e);
//   }
// };

// 실종자 정보 생성
const missingRegist = async ({data}) => {
  const token = await getAccessTokenFromKeychain();
  const imageList = data.imageList;
  const dataFormat = new FormData();
  console.log('pos : ', data.pos.lat, data.pos.lng);
  const file = new File();
  dataFormat.append('frontImage', imageList[0]);
  dataFormat.append(
    'otherImage1',
    imageList >= 2 ? imageList[1] : file,
    'file',
  );
  dataFormat.append(
    'otherImage2',
    imageList >= 3 ? imageList[2] : file,
    'file',
  );
  dataFormat.append('name', data.name);
  dataFormat.append('birthDate', data.birth);
  dataFormat.append('gender', data.gender);
  dataFormat.append('longitude', data.pos.lat);
  dataFormat.append('latitude', data.pos.lng);
  try {
    const response = await fetch(MAIN_URL + '/api/regist/', {
      method: 'post',
      body: dataFormat,
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'multipart/form-data',
      },
    });
    const resJson = await response.json();
    const status = resJson.status;
    return status;
  } catch (e) {
    console.log(e);
  }
};

// 실종자 정보 조회 (detail)
const apiGetMissingPerson = async registId => {
  const token = await getAccessTokenFromKeychain();
  try {
    const response = await api.get(`/api/regist/detail/${registId}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

// 실종자 정보 수정
const apiPutMissingPerson = async data => {
  const token = await getAccessTokenFromKeychain();
  let imageList = null;
  if (data.imageList !== null) imageList = data.imageList;
  let imagePath = null;
  if (data.imagePath !== null) imagePath = data.imagePath;
  const formData = new FormData();
  // formatImgae
  console.log(imageList[0]);
  if (imageList.length >= 1 && imageList[0].type !== undefined) {
    formData.append('frontImage', {
      uri: imageList[0].uri,
      type: imageList[0].type,
      name: imageList[0].name,
    });
  }
  if (imageList.length >= 2 && imageList[1].type !== undefined) {
    formData.append('otherImage1', {
      uri: imageList[1].uri,
      type: imageList[1].type,
      name: imageList[1].name,
    });
  }
  if (imageList.length >= 3 && imageList[2].type !== undefined) {
    formData.append('otherImage2', {
      uri: imageList[2].uri,
      type: imageList[2].type,
      name: imageList[2].name,
    });
  }
  // Image path
  if (imagePath.length >= 1) {
    formData.append('frontImagePath', imagePath[0].uri);
  }
  if (imagePath.length >= 2) {
    formData.append('otherImage1Path', imagePath[1].uri);
  }
  if (imagePath.length >= 3) {
    formData.append('otherImage2Path', imagePath[2].uri);
  }

  formData.append('name', data.name);
  formData.append('birthDate', data.birth);
  formData.append('gender', data.gender);
  if (data.pos !== null) {
    formData.append('longitude', data.pos.lat);
    formData.append('latitude', data.pos.lng);
  }
  formData.append('registId', data.id);
  console.log('(apiMissingPerson.js) 실종자 보내는 formData : ', formData);
  try {
    const response = await axios.put(MAIN_URL + '/api/regist', formData, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(
      '(apiMissingPerson.js) 실종자 받는 Data : ',
      response.data.data,
    );
    return response;
  } catch (error) {
    console.log('실패');
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
