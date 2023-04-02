import { atom } from 'recoil';

const IsLoadingState = atom({
  key: 'isLoading',
  default: false,
});

export default IsLoadingState;
