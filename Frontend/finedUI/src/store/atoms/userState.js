import { atom } from 'recoil';


export const isLoginState = atom({
  key: `isLoginState`,
  default: false,
});

export const myInfoState = atom({
  key: 'myInfoState',
  default: {}
})
