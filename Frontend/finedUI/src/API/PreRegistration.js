import { addInfoState, missingInfoState, preInfoState } from "../store/atoms/InfoState";
import { getAccessTokenFromKeychain } from "../store/keychain/loginToken";
import apiInstance from "./apiInstance";
import { getRecoil, setRecoil } from "recoil-nexus";

const api = apiInstance();

// 사전 등록 정보 가져오기
export const getPreInfo = async () => {
  try {
    const token = await getAccessTokenFromKeychain();
    const response = await api.get(`/api/regist/isMissing?isMissing=0`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    setRecoil(preInfoState, response.data.data)
    return response.data
  } catch (error) {
    console.error(error);
    return error
  }
};

// 실종 등록 정보 가져오기
export const getMissingInfo = async () => {
  try {
  const token = await getAccessTokenFromKeychain();
  const response = await api.get(`/api/regist/isMissing?isMissing=1`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
  setRecoil(missingInfoState, response.data.data)
  return response.data
} catch (error) {
  console.error(error);
  return error
}
};

// 사전 -> 실종 변경하기
export const changeMissing = async (registId, longitude, latitude) => {
  try {
  const addInfo = getRecoil(addInfoState)
  const token = await getAccessTokenFromKeychain();
  const response = await api.patch(`/api/regist`,{
    registId,
    longitude,
    latitude
  }, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
  setRecoil(addInfoState, addInfo+1)
  // console.log(response)
  return response.data
} catch (error) {
  console.error(error);
  return error
}
};