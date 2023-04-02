import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RegistSelectScreen from '../screens/RegistSelectScreen';
import RegistScreen from '../screens/RegistScreen';
import {useRecoilValue, useResetRecoilState} from 'recoil';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {
  fontPercentage,
  heightPercentage,
  widthPercentage,
} from '../../styles/ResponsiveSize';
import {
  registName,
  registBirth,
  registGender,
  registImageList,
  registMissingDate,
  registPos,
  registMode,
  registNote,
} from '../store_regist/registStore';

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
  completeBtnTitle: {
    fontSize: fontPercentage(18),
    fontWeight: 'bold',
    color: '#3ca6ef',
  },
});

const RegistStackNavigation = () => {
  const name = useRecoilValue(registName);
  const birth = useRecoilValue(registBirth);
  const gender = useRecoilValue(registGender);
  const imageList = useRecoilValue(registImageList);
  const date = useRecoilValue(registMissingDate);
  const pos = useRecoilValue(registPos);
  const note = useRecoilValue(registNote);
  const mode = useRecoilValue(registMode);

  const resetImageList = useResetRecoilState(registImageList);
  const resetName = useResetRecoilState(registName);
  const resetBirth = useResetRecoilState(registBirth);
  const resetGender = useResetRecoilState(registGender);
  const resetMissingDate = useResetRecoilState(registMissingDate);
  const resetPos = useResetRecoilState(registPos);
  const resetNote = useResetRecoilState(registNote);
  const resetMode = useResetRecoilState(registMode);

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
                  resetImageList();
                  resetName();
                  resetBirth();
                  resetGender();
                  resetMissingDate();
                  resetPos();
                  resetNote();
                  resetMode();
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
