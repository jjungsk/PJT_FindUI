import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigation from './BottomTabNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {Test} from '../screens/test';
import AlarmScreen from '../screens/AlarmScreen';

/**
 * 앱에 사용되는 모든 화면 컴포넌트 등록
 * 사용방법
 * <Stack.Screen
 *   name="화면이름"
 *   component={화면컴포넌트}
 *   options={{화면옵션(적용가능한 옵션은 https://reactnavigation.org/docs/native-stack-navigator#options 해당 링크의 options props 확인)}}>
 * </Stack.Screen>
 */

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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
