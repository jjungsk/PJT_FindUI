import React from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import RegistSelectBtn from '../organisms/RegistSelect';

const RegistSelectScreen = ({navigation}) => {
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
        onPress={() => navigation.navigate('registMain', {mode: 0})}>
        <RegistSelectBtn selectItem={preRegistItem} />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.navigate('registMain', {mode: 1})}>
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
