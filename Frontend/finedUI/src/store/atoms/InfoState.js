import { atom } from 'recoil';


export const preInfoState = atom({
  key: `preInfoState`,
  default: [],
});

export const missingInfoState = atom({
  key: `missingInfoState`,
  default: [],
});
