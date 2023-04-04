import axios from 'axios';

import {
  KAKAO_URL_GET_ADDRESS,
  KAKAO_URL_GET_LNGLAT,
  KAKAO_MAP_API_KEY,
} from '@env';

// (1) 경도 위도 값을 통해 주소 값 리턴
// x와 y좌표를 통해 address_name, region_1depth_name, region_2depth_name, region_3depth_name 리턴
const apiGetAddress = async ({lng, lat}) => {
  try {
    await axios
      .get(`${KAKAO_URL_GET_ADDRESS}?x=${lng}&y=${lat}`, {
        headers: {
          Authorization: `KakaoAK ${KAKAO_MAP_API_KEY}`,
        },
      })
      .then(response => {
        const result = response.data.documents[0];
        console.log('주소 리턴', result['address_name']);
        return response;
      });
  } catch (error) {
    console.log(error);
  }
};

// (2) 주소 값을 통해 경도 위도 값 리턴
// 주소 값은 통해 x, y 값 리턴
const apiGetLngLat = async address => {
  try {
    await axios
      .get(`${KAKAO_URL_GET_LNGLAT}?query=${address}`, {
        headers: {
          Authorization: `KakaoAK ${KAKAO_MAP_API_KEY}`,
        },
      })
      .then(response => {
        const result = response.data.documents[0];
        console.log('위경도 리턴', result);
        return result;
      });
  } catch (error) {
    console.log(error);
  }
};

export {apiGetAddress, apiGetLngLat};
