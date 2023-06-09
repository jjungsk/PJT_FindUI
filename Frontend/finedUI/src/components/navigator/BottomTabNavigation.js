/*
  앱의 하단 네비게이션에 들어가는 화면 컴포넌트 등록
  사용방법
  <Tab.Screen
    name="화면이름"
    component={화면컴포넌트}
    options={{화면옵션(적용가능한 옵션은 https://reactnavigation.org/docs/bottom-tab-navigator#options 해당 링크 확인)}}>
  </Tab.Screen>
*/

// react
import React from 'react';

// react-native

// react-navigation
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import ChatScreen from '../screens/ChatScreen';

// icons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// sizes
import {heightPercentage, widthPercentage} from '../../styles/ResponsiveSize';
import ChatListScreen from '../screens/ChatListScreen';

// components - NavBar
import HomeScreen from '../screens/HomeScreen';
import RegistStackNavigation from './RegistStackNavigation';
import MyPage from '../screens/MyPage';
import SearchPage from '../screens/SearchPage';

const Tab = createBottomTabNavigator();

const TabNavigation = ({navigation}) => {
  return (
    <Tab.Navigator
      screenOptions={{tabBarHideOnKeyboard: true, unmountOnBlur: true}}>
      {/* homescreen */}
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
            />
          ),
        }}
      />
      <Tab.Screen
        name="Regist"
        component={RegistStackNavigation}
        options={{
          title: 'Find & You',
          tabBarLabel: '등록',
          tabBarIcon: ({color, size}) => (
            <Icon
              name="image-plus"
              color={color}
              size={widthPercentage(size)}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="SearchPage"
        component={SearchPage}
        options={{
          title: 'Find & You',
          tabBarLabel: '검색',
          tabBarIcon: ({color, size}) => (
            <Icon name="magnify" color={color} size={widthPercentage(size)} />
          ),
        }}
      />
      <Tab.Screen
        name="ChatList"
        component={ChatListScreen}
        options={{
          title: 'Find & You',
          subTitle: '채팅목록',
          tabBarLabel: '채팅목록',
          tabBarIcon: ({color, size}) => (
            <Icon
              name="chat-processing"
              color={color}
              size={widthPercentage(size)}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPage}
        options={{
          title: 'Find & You',
          tabBarLabel: '마이페이지',
          tabBarIcon: ({color, size}) => (
            <Icon
              name="account-outline"
              color={color}
              size={widthPercentage(size)}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
