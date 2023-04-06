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
import {Text, Alert, TouchableOpacity, StyleSheet} from 'react-native';
import {fontPercentage} from '../../styles/ResponsiveSize';

// react-navigation
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
// import {Test} from '../screens/test';
import ChatScreen from '../screens/ChatScreen';
import ChatListScreen from '../screens/ChatListScreen';

// recoil
import {useRecoilValue} from 'recoil';
import {
  registBirth,
  registGender,
  registImageList,
  registMissingDate,
  registMode,
  registName,
  registPos,
  registProps,
  registId,
} from '../store_regist/registStore';

// date format
import {format} from 'date-fns';
import ko from 'date-fns/esm/locale/ko/index.js';

// components
import TabNavigation from './BottomTabNavigation';
import AlarmScreen from '../screens/AlarmScreen';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import MapViewDetail from '../screens/MapViewDetail';
import ModifyScreen from '../screens/ModifyScreen';
import LoginPage from '../screens/LoginPage';
import SearchPage from '../screens/SearchPage';
import RegistScreen from '../screens/RegistScreen';

// apis
import {
  missingRegist,
  preRegist,
  apiPutMissingPerson,
} from '../../API/apiMissingPerson';
import {isLoginState} from '../../store/atoms/userState';
import WrappedSignUpAll from '../screens/SignUpAll';
import {navigationRef} from './NavigationService';

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
  completeBtnTitle: {
    fontSize: fontPercentage(18),
    fontWeight: 'bold',
    color: '#3ca6ef',
  },
});

const StackNavigation = () => {
  const isLogin = useRecoilValue(isLoginState);

  // 실종자 정보 수정 para
  const registPropsState = useRecoilValue(registProps);
  const imageList = useRecoilValue(registImageList);
  const name = useRecoilValue(registName);
  const birth = useRecoilValue(registBirth);
  const gender = useRecoilValue(registGender);
  const date = useRecoilValue(registMissingDate);
  const pos = useRecoilValue(registPos);
  const mode = useRecoilValue(registMode);
  const id = useRecoilValue(registId);
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
            <Stack.Screen name="ModifyScreen" component={ModifyScreen} />
            <Stack.Screen name="ChatList" component={ChatListScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen
              name="registMain"
              component={RegistScreen}
              initialParams={{userInfo: null}}
              options={{
                title: 'Find & You',
                headerRight: () => {
                  return (
                    <TouchableOpacity
                      onPress={async () => {
                        // 서버에 실종자 정보 등록
                        let status = 200;
                        const {prop, state} = registPropsState;
                        if (!state) {
                          Alert.alert('', prop + '을 추가해주세요', [
                            {
                              text: '확인',
                              onPress: () => {},
                            },
                          ]);
                        } else {
                          if (mode === 3) {
                            const dateString = format(
                              date,
                              'yyyy-MM-dd HH:mm:ss',
                              {
                                locale: ko,
                              },
                            );
                            const data = {
                              imageList: imageList,
                              name: name,
                              birth: birth,
                              gender: gender,
                              date: dateString,
                              pos: pos,
                              id: id,
                            };
                            console.log(
                              '(RegistStackNavigation.js)실종자 정보 수정 : ',
                              data,
                            );
                            // 실종자 정보 수정 api 호출
                            try {
                              await apiPutMissingPerson({
                                data,
                              });
                            } catch (e) {
                              console.log(e);
                            }
                          }
                        }
                        if (status == 200) {
                          // navigation.reset({routes: [{name: 'Home'}]});
                        }
                      }}>
                      {mode !== 4 && (
                        <Text style={styles.completeBtnTitle}>완료</Text>
                      )}
                    </TouchableOpacity>
                  );
                },
              }}
            />
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
