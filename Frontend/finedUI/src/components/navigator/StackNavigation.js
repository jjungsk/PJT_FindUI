/*
  앱에 사용되는 모든 화면 컴포넌트 등록
  사용방법
  <Stack.Screen
    name="화면이름"
    component={화면컴포넌트}
    options={{화면옵션(적용가능한 옵션은 https://reactnavigation.org/docs/native-stack-navigator#options 해당 링크의 options props 확인)}}>
  </Stack.Screen>
 */

// react
import React from 'react';

// react-navigation
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
// import {Test} from '../screens/test';
import ChatScreen from '../screens/ChatScreen';
import ChatListScreen from '../screens/ChatListScreen';

// components
import TabNavigation from './BottomTabNavigation';
import AlarmScreen from '../screens/AlarmScreen';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import MapViewDetail from '../screens/MapViewDetail';
// import ModifyScreen from '../screens/ModifyScreen';
import LoginPage from '../screens/LoginPage';
import SearchPage from '../screens/SearchPage';
import {useRecoilValue} from 'recoil';
import {isLoginState} from '../../store/atoms/userState';
import WrappedSignUpAll from '../screens/SignUpAll';
import {navigationRef} from './NavigationService';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  const isLogin = useRecoilValue(isLoginState);
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={isLogin ? 'TapNavigation' : 'LoginPage'}>
        {isLogin ? (
          <>
            <Stack.Screen
              name="TabNavigation"
              component={TabNavigation}
              options={{headerShown: false}}
            />
            <Stack.Screen name="SearchPage" component={SearchPage} />
            <Stack.Screen name="AlarmScreen" component={AlarmScreen} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="DetailScreen" component={DetailScreen} />
            <Stack.Screen name="MapDetail" component={MapViewDetail} />
            {/* <Stack.Screen name="ModifyScreen" component={ModifyScreen} /> */}
            <Stack.Screen name="ChatList" component={ChatListScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="LoginPage" component={LoginPage} />
            <Stack.Screen name="SignUpAll" component={WrappedSignUpAll} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
