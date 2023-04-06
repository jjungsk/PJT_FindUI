// recoil
import {selector} from 'recoil';
import {
  missingInfoState,
  preInfoState,
  noticeInfoState,
  missingShortInfoState,
  missingLongInfoState,
} from '../atoms/InfoState';

// apis
import {getMissingInfo, getPreInfo} from '../../API/PreRegistration';
import {apiGetNotices, apiGetMissingPersonAll} from '../../API/apiHome';

export const preSelector = selector({
  key: 'preSelector',
  get: async ({get}) => {
    const response = await getPreInfo();
    return response.data;
  },
  set: ({set}, newValue) => {
    set(preInfoState, newValue);
  },
});

export const missingSelector = selector({
  key: 'missingSelector',
  get: async ({get}) => {
    const response = await getMissingInfo();
    return response.data;
  },
  set: ({set}, newValue) => {
    set(missingInfoState, newValue);
  },
});

// 홈 - 공지사항 selector
export const noticeSelector = selector({
  key: 'noticeSelector',
  get: async ({get}) => {
    const response = await apiGetNotices();
    return response.data;
  },
  set: ({set}, newValue) => {
    set(noticeInfoState, newValue);
  },
});

// 홈 - 실시간 실종자 selector
export const missingShortSelector = selector({
  key: 'missingShortSelector',
  get: async ({get}) => {
    const response = await apiGetMissingPersonAll();
    return response.data;
  },
  set: ({set}, newValue) => {
    set(missingShortInfoState, newValue);
  },
});

// 홈 - 장시간 실종자 selecotr
export const missingLongSelector = selector({
  key: 'missingLongSelector',
  get: async ({get}) => {
    const response = await apiGetMissingPersonAll();
    return response.data;
  },
  set: ({set}, newValue) => {
    set(missingLongInfoState, newValue);
  },
});
