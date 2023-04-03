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

const RegistStackNavigation = ({navigation}) => {
  const name = useRecoilValue(registName);
  const birth = useRecoilValue(registBirth);
  const gender = useRecoilValue(registGender);
  const imageList = useRecoilValue(registImageList);
  const date = useRecoilValue(registMissingDate);
  const pos = useRecoilValue(registPos);
  const note = useRecoilValue(registNote);
  const mode = useRecoilValue(registMode);

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
