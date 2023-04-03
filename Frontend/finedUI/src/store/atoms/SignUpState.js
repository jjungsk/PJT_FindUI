import { atom } from 'recoil';

const signRoot = 'sign'

export const nameState = atom({
  key: `${signRoot}/nameState`,
  default: '',
});

export const addressState = atom({
  key: `${signRoot}/addressState`,
  default: '',
});

export const phoneState = atom({
  key: `${signRoot}/phoneState`,
  default: '',
});

export const emailState = atom({
  key: `${signRoot}/emailState`,
  default: '',
});

export const passwordState = atom({
  key: `${signRoot}/passwordState`,
  default: '',
});

export const pwConfirmState = atom({
  key: `${signRoot}/pwConfirmState`,
  default: '',
});

export const phoneCheckState = atom({
  key: `${signRoot}/phoneCheckState`,
  default: false,
});