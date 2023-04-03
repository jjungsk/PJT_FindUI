import {atom} from 'recoil';

const userPosition = atom({
  key: 'userPosition',
  default: {lat: 0, lng: 0},
});

export {userPosition};
