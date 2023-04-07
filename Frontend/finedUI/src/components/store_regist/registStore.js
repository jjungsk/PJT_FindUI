import {atom, selector} from 'recoil';

const userPosition = atom({
  key: 'userPosition',
  default: {lat: 0, lng: 0},
});

const registImageList = atom({
  key: 'registImageList',
  default: [],
});

const registImagePath = atom({
  key: 'registImagePath',
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

const registMode = atom({
  key: 'registMode',
  default: 0,
});

const registAddress = atom({
  key: 'registAddress',
  default: null,
});

const registId = atom({
  key: 'registId',
  default: 0,
});

const registProps = selector({
  key: 'registProps',
  get: ({get}) => {
    const imageList = get(registImageList);
    const name = get(registName);
    const birth = get(registBirth);
    const gender = get(registGender);
    const date = get(registMissingDate);
    const pos = get(registPos);
    const mode = get(registMode);

    if (imageList.length < 1) {
      return {prop: '사진', state: false};
    }
    if (name === '') {
      return {prop: '이름', state: false};
    }
    if (birth === null || birth.length < 8) {
      return {prop: '생년월일', state: false};
    }
    if (gender === null) {
      return {prop: '성별', state: false};
    }
    if (mode !== 0) {
      if (pos === null) {
        return {prop: '실종 장소', state: false};
      }
    }

    return {prop: null, state: true};
  },
});

const resetRegistAtoms = selector({
  key: 'resetRegistAtoms',
  get: () => {},
  set: ({set}, mode) => {
    set(registImageList, []);
    set(registImagePath, []);
    set(registName, '');
    set(registBirth, null);
    set(registGender, null);
    set(registMissingDate, new Date());
    set(registPos, null);
    set(registMode, mode);
    set(userPosition, {lat: 0, lng: 0});
    set(registAddress, '');
    set(registId, 0);
  },
});

export {
  registImageList,
  registImagePath,
  registName,
  registBirth,
  registGender,
  registMissingDate,
  registPos,
  registMode,
  userPosition,
  resetRegistAtoms,
  registAddress,
  registProps,
  registId,
};
