import { atom } from 'recoil';


export const preInfoState = atom({
  key: `preInfoState`,
  default: [],
});

export const missingInfoState = atom({
  key: `missingInfoState`,
  default: [],
});

export const addInfoState = atom({
  key: `addInfoState`,
  default: false,
});
