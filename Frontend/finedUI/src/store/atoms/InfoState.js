import {atom} from 'recoil';

// 홈 - 유저 사전 등록
export const preInfoState = atom({
  key: `preInfoState`,
  default: [],
});

// 홈 - 유저 사전 -> 실종 전환
export const missingInfoState = atom({
  key: `missingInfoState`,
  default: [],
});

// 홈 - 공지사항
export const noticeInfoState = atom({
  key: 'noticeInfoState',
  default: [],
});

// 홈 - 실시간 실종자
export const missingShortInfoState = atom({
  key: 'missingShortInfoState',
  default: [],
});

// 홈 - 장기 실종자
export const missingLongInfoState = atom({
  key: 'missingLongInfoState',
  default: [],
});
