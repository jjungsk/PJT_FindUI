import React from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import {useSetRecoilState} from 'recoil';
import RegistSelectBtn from '../organisms/RegistSelect';
import {resetRegistAtoms} from '../store_regist/registStore';

const RegistSelectScreen = ({navigation}) => {
  const resetRegistProps = useSetRecoilState(resetRegistAtoms);
  const preRegistItem = {
    title: '사전 등록',
    content:
      '급작스러운 상황에도 당신의 소중한 사람을 바로 찾기 위해 사전등록을 해주세요',
  };
  const missingRegistItem = {
    title: '실종자 등록',
    content: '실종자 등록을 통해 당신의 소중한 사람을 찾아보세요',
  };
  const familyRegistItem = {
    title: '이산가족 등록',
    content: '멀리 떨어진 가족을 찾아보세요',
  };
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.navigate('registMain')}>
        <RegistSelectBtn selectItem={preRegistItem} />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          resetRegistProps((mode = 1));
          navigation.navigate('registMain');
        }}>
        <RegistSelectBtn selectItem={missingRegistItem} />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.6}>
        <RegistSelectBtn selectItem={familyRegistItem} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

export default RegistSelectScreen;
