/*
  NaverMap organisms Format -> Component화 불가.. template으로 사용 법만 볼것!
  네이버 지도 뿌려주는 부분
  made by. 정세권
*/

import React from 'react';

import {View} from 'react-native';

import NaverMapView, {Marker} from 'react-native-nmap';

const NaverMap = React.memo(() => {
  const P0 = {latitude: 37.564362, longitude: 126.977011};

  return (
    <View>
      <NaverMapView
        style={{width: '100%', height: '100%'}}
        center={{...P0, zoom: 12}}>
        <Marker coordinate={P0} onClick={() => console.warn('onClick! p0')} />
      </NaverMapView>
    </View>
  );
});

export default NaverMap;
