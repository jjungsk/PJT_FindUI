import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RegistSelectScreen from '../screens/RegistSelectScreen';
import RegistScreen from '../screens/RegistScreen';

const Stack = createNativeStackNavigator();

const RegistStackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="registRoot">
      <Stack.Screen
        name="registRoot"
        component={RegistSelectScreen}
        options={{
          title: 'Find & You',
        }}
      />
      <Stack.Screen
        name="registMain"
        component={RegistScreen}
        options={{
          title: 'Find & You',
        }}
      />
    </Stack.Navigator>
  );
};

export default RegistStackNavigation;
