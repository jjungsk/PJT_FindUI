import { selector } from 'recoil';
import { missingInfoState, preInfoState } from '../atoms/InfoState';
import { getMissingInfo, getPreInfo } from '../../API/PreRegistration';

export const preSelector = selector({
  key: 'preSelector',
  get: async ({ get }) => {
    const response = await getPreInfo(); 
    return response.data
  },
  set: ({ set }, newValue) => {
    set(preInfoState, newValue);
  },
});

export const missingSelector = selector({
  key: 'missingSelector', 
  get: async ({ get }) => {
    const response = await getMissingInfo();
    return response.data
  },
  set: ({ set }, newValue) => {
    set(missingInfoState, newValue);
  },
});
