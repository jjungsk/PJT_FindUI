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

import {atom} from 'recoil';

const countState = atom({
  key: 'countState',
  default: 0,
});

const stringState = atom({
  key: 'string',
  default: 'Sekwun',
});

export {countState, stringState};
