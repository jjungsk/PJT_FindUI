import {atom, selector} from 'recoil';

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

const registMode = atom({
  key: 'registMode',
  default: 0,
});

const registAddress = atom({
  key: 'registAddress',
  default: null,
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

    if (imageList.length < 1) {
      return {porp: '사진', state: false};
    }
    if (name === '') {
      return {porp: '이름', state: false};
    }
    if (birth === null) {
      return {porp: '생년월일', state: false};
    }
    if (gender === null) {
      return {porp: '성별', state: false};
    }
    // if (date !=){
    //   return {porp:"사진", state:false}
    // }
    if (pos === null) {
      return {porp: '실종 장소', state: false};
    }

    return {prop: null, state: true};
  },
});

const resetRegistAtoms = selector({
  key: 'resetRegistAtoms',
  set: ({set}, mode) => {
    set(registImageList, []);
    set(registName, '');
    set(registBirth, null);
    set(registGender, null);
    set(registMissingDate, new Date());
    set(registPos, null);
    set(registMode, mode);
    set(userPosition, {lat: 0, lng: 0});
    set(registAddress, '');
  },
});

export {
  registImageList,
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
};
