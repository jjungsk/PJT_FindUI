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

// components
import TabNavigation from './BottomTabNavigation';
import AlarmScreen from '../screens/AlarmScreen';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import LoginPage from '../screens/LoginPage';
import PhonePage from '../screens/PhonePage';
import SignUpPage from '../screens/SignUpPage';
import InfoPage from '../screens/InfoPage';
import SearchPage from '../screens/SearchPage';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TabNavigation">
        <Stack.Screen
          name="TabNavigation"
          component={TabNavigation}
          options={{headerShown: false}}
        />
        <Stack.Screen name="AlarmScreen" component={AlarmScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="DetailScreen" component={DetailScreen} />
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="PhonePage" component={PhonePage} />
        <Stack.Screen name="SignUpPage" component={SignUpPage} />
        <Stack.Screen name="InfoPage" component={InfoPage} />
        <Stack.Screen name="SearchPage" component={SearchPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
