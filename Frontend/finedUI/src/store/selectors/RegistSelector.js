import { selector } from 'recoil';
import { addInfoState, missingInfoState, preInfoState } from '../atoms/InfoState';
import { getMissingInfo, getPreInfo } from '../../API/PreRegistration';

export const preSelector = selector({
  key: 'preSelector',
  
  get: async ({ get }) => {
    const addInfo = get(addInfoState)
    if(addInfo) {
      const response = await getPreInfo(); 
      return response.data
    }
    return get(preInfoState)
  },
  set: ({ set }, newValue) => {
    set(preInfoState, newValue);
  },
});

export const missingSelector = selector({
  key: 'missingSelector', 
  get: async ({ get }) => {
    const addInfo = get(addInfoState)
    if(addInfo) {
      const response = await getMissingInfo();
      return response.data
    }
    return get(missingInfoState)
  },
  set: ({ set }, newValue) => {
    set(missingInfoState, newValue);
  },
});
