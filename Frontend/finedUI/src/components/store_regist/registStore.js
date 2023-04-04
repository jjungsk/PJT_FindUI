import {atom, selector} from 'recoil';
import axios from 'axios';

import {KAKAO_URL_GET_ADDRESS, KAKAO_MAP_API_KEY} from '@env';

const userPosition = atom({
  key: 'userPosition',
  default: {lat: 0, lng: 0},
});

const registImageList = atom({
  key: 'registImageList',
  default: [],
});

const registName = atom({
  key: 'registName',
  default: '',
});

const registBirth = atom({
  key: 'registBirth',
  default: '',
});

const registGender = atom({
  key: 'registGender',
  default: null,
});

const registMissingDate = atom({
  key: 'registMissingDate',
  default: new Date(),
});

const registPos = atom({
  key: 'registPos',
  default: null,
});

const registNote = atom({
  key: 'registNote',
  default: '',
});

const registMode = atom({
  key: 'registMode',
  default: 0,
});

const registAddress = atom({
  key: 'registAddress',
  default: null,
});

const resetRegistAtoms = selector({
  key: 'resetRegistAtoms',
  get: ({get}) => {},
  set: ({set}, mode) => {
    set(registImageList, []);
    set(registName, '');
    set(registBirth, null);
    set(registGender, null);
    set(registMissingDate, new Date());
    set(registPos, null);
    set(registNote, '');
    set(registMode, mode);
    set(userPosition, {lat: 0, lng: 0});
  },
});

export {
  registImageList,
  registName,
  registBirth,
  registGender,
  registMissingDate,
  registPos,
  registNote,
  registMode,
  userPosition,
  resetRegistAtoms,
  registAddress,
};
