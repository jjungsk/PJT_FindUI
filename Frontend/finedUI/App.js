// react
import React, {useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import { RecoilRoot, useRecoilValue } from 'recoil';
import {Platform, PermissionsAndroid} from 'react-native';

import StackNavigation from './src/components/navigator/StackNavigation';

import Geolocation from 'react-native-geolocation-service';

import Loading from './src/components/atoms/Loading';
import IsLoadingState from './src/store/atoms/IsLoadingState';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

const App = () => {
  useEffect(() => {
    requestPermission();
  }, []);

  const isLoading = useRecoilValue(IsLoadingState);

  if (isLoading) {
    return(
      <View style={styles.container}>
        <Loading visible={isLoading} />
      </View>
    )
  } else {
    return (<Hannah/>)
  }
};

export default function WrappedApp() {
  return (
    <RecoilRoot>
      <App/>
    </RecoilRoot>
  )
};