import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RegistSelectScreen from '../screens/RegistSelectScreen';

const Stack = createNativeStackNavigator();

const RegistStackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="registRoot"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="registRoot" component={RegistSelectScreen} />
    </Stack.Navigator>
  );
};

export default RegistStackNavigation;
