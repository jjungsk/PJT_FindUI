import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, Alert, TouchableOpacity, StyleSheet} from 'react-native';
import {
  fontPercentage,
  heightPercentage,
  widthPercentage,
} from '../../styles/ResponsiveSize';

import {useRecoilValue, useResetRecoilState} from 'recoil';
import {registProps} from '../store_regist/registStore';

import RegistSelectScreen from '../screens/RegistSelectScreen';
import RegistScreen from '../screens/RegistScreen';

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
                onPress={() => {
                  // 서버에 실종자 정보 등록
                  const {prop, state} = registPropsState;
                  if (state) {
                    Alert.alert('', prop + '을 추가해주세요', [
                      {
                        text: '확인',
                        onPress: () => {
                          return;
                        },
                      },
                    ]);
                  } else {
                  }
                  navigation.reset({routes: [{name: 'Home'}]});
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
