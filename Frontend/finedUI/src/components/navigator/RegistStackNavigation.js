import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, Alert, TouchableOpacity, StyleSheet} from 'react-native';
import {
  fontPercentage,
  heightPercentage,
  widthPercentage,
} from '../../styles/ResponsiveSize';

import {useRecoilValue, useResetRecoilState, useSetRecoilState} from 'recoil';
import {
  registBirth,
  registGender,
  registImageList,
  registMissingDate,
  registMode,
  registName,
  registPos,
  registProps,
} from '../store_regist/registStore';

import RegistSelectScreen from '../screens/RegistSelectScreen';
import RegistScreen from '../screens/RegistScreen';
import {el} from 'date-fns/locale';
import {missingRegist, preRegist} from '../../API/apiMissingPerson';
import {format} from 'date-fns';
import ko from 'date-fns/esm/locale/ko/index.js';
import { reset } from './NavigationService';
import { setRecoil } from 'recoil-nexus';
import { addInfoState } from '../../store/atoms/InfoState';
import { missingSelector, preSelector } from '../../store/selectors/RegistSelector';

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
  completeBtnTitle: {
    fontSize: fontPercentage(18),
    fontWeight: 'bold',
    color: '#3ca6ef',
  },
});

const RegistStackNavigation = ({navigation}) => {
  const registPropsState = useRecoilValue(registProps);
  const imageList = useRecoilValue(registImageList);
  const name = useRecoilValue(registName);
  const birth = useRecoilValue(registBirth);
  const gender = useRecoilValue(registGender);
  const date = useRecoilValue(registMissingDate);
  const pos = useRecoilValue(registPos);
  const mode = useRecoilValue(registMode);
  const setAddInfo = useSetRecoilState(addInfoState)
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
                    if (mode == 0) {
                      console.log(mode);
                      try {
                        status = await preRegist({
                          data: {
                            imageList: imageList,
                            name: name,
                            birth: birth,
                            gender: gender,
                          },
                        });
                      } catch (e) {
                        console.log(e);
                      }
                    } else {
                      console.log(mode);
                      const dateString = format(date, 'yyyy-MM-dd HH:mm:ss', {
                        locale: ko,
                      });
                      try {
                        status = await missingRegist({
                          data: {
                            imageList: imageList,
                            name: name,
                            birth: birth,
                            gender: gender,
                            date: dateString,
                            pos: pos,
                          },
                        });
                      } catch (e) {
                        console.log(e);
                      }
                    }
                  }
                  if (status === 'CREATED') {
                    reset('Home')
                    setAddInfo(true)
                  }
                }}>
                <Text style={styles.completeBtnTitle}>완료</Text>
              </TouchableOpacity>
            );
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default RegistStackNavigation;
