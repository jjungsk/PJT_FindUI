// react
import React, {useEffect} from 'react';
import {View, StyleSheet, Platform, PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {
  RecoilRoot,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';

// stack
import StackNavigation from './src/components/navigator/StackNavigation';

// components
import Loading from './src/components/atoms/Loading';
import {isLoadingState} from './src/store/atoms/IsLoadingState';
import {checkAcess} from './src/API/AccountApi';
import {isLoginState} from './src/store/atoms/userState';

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
  },
});

const App = () => {
  useEffect(() => {
    requestPermission();
  }, []);

  const isLoading = useRecoilValue(isLoadingState);
  const setIsLoading = useSetRecoilState(isLoadingState);
  const setIsLogin = useSetRecoilState(isLoginState);

  // useEffect(() => {
  //   const checkLogin = async () => {
  //     const response = await checkAcess();
  //     setIsLoading(false)
  //     if (response === true) {
  //       console.log('동작')
  //       setIsLogin(true)
  //     } else {
  //       console.log('실패')
  //       setIsLogin(false)
  //     }
  //   }
  //   if(isLoading){
  //     checkLogin();
  //   }
  // }
  // , []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Loading visible={isLoading} />
      </View>
    );
  } else {
    return <StackNavigation />;
  }
};

export default function WrappedApp() {
  return (
    <RecoilRoot>
      <App />
    </RecoilRoot>
  );
}
