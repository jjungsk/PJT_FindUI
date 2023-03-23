import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import {Test} from '../screens/test';
import {View, Text} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {heightPercentage, widthPercentage} from '../../styles/ResponsiveSize';
import {CustomHeader} from '../organisms/CustomHeader';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{tabBarHideOnKeyboard: true}}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Find & You',
            tabBarLabel: '홈',
            tabBarIcon: ({color, size}) => (
              <Icon
                name="home-variant-outline"
                color={color}
                size={widthPercentage(size)}
                style={{
                  width: widthPercentage(size),
                  height: heightPercentage(size),
                }}
              />
            ),
            header: ({navigation, route, options}) => {
              const title = options.title;
              console.log(options.headerStyle);

              return <CustomHeader title={title} />;
            },
          }}
        />
        <Tab.Screen name="Test" component={Test} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigation;
