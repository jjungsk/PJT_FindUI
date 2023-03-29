/*
  atom 상태 관리
  key: 고유 key 값
  default: 초기 값

  해당 component 사용 시
  import {useRecoilState, useRecoilValue} from 'recoil';
  import {stringState} from '../../store/atoms/atoCount.js';
  import {selCountState} from '../../store/selectors/selCount.js';

  const [text, setText] = useRecoilState(stringState);
  const value = useRecoilValue(stringState);
  const selResult = useRecoilValue(selCountState);
*/

import {selector} from 'recoil';

import {countState, stringState} from '../atoms/atoCount';

const selCountState = selector({
  key: 'selCountState',
  get: ({get}) => {
    const count = get(countState);
    return count * 2;
  },
});

const selStringState = selector({
  key: 'selStrigState',
  get: ({get}) => {
    const stringTe = get(stringState);
    return stringTe.length;
  },
});

// get 으로 axios response 받아오고 -> set 함수를 통해 atoms에 저장
// const axiosExample = selector({
//   key: 'getUserInfo',
//   get: async ({ get }) => {
//     try {
//       const response = await axios.get('http://url~~');
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   },
//   set: ({ set }, newValue) => {
//     set(userState, newValue);
//   },
// });

export {selCountState, selStringState};
