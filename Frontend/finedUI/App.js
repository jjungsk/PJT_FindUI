import React, {useEffect} from 'react';
import {Platform, PermissionsAndroid} from 'react-native';

import StackNavigation from './src/components/navigator/StackNavigation';

import Geolocation from 'react-native-geolocation-service';

async function requestPermission() {
  try {
    if (Platform.OS === 'ios') {
      return await Geolocation.requestAuthorization('always');
    }
    // 안드로이드 위치 정보 수집 권한 요청
    if (Platform.OS === 'android') {
      return await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }
  } catch (e) {
    console.log(e);
  }
}

const App = () => {
  useEffect(() => {
    requestPermission();
  }, []);
  return <StackNavigation />;
};

export default App;
