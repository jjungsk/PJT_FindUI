import {atom, useResetRecoilState} from 'recoil';

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
  default: {latitude: 0, longitude: 0},
});

const registNote = atom({
  key: 'registNote',
  default: '',
});

const registMode = atom({
  key: 'registMode',
  default: 0,
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
};
