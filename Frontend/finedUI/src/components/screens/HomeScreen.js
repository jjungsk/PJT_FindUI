import React from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import PreRegistCard from '../organisms/PreRegistCard';

const HomeScreen = () => {
  const registUser = {
    name: '샘스미스',
    birthday: new Date(1997, 2, 18),
    address: '서울시 역삼동 멀티캠퍼스',
    phone: '010-6725-5590',
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <PreRegistCard registUser={registUser} />
    </SafeAreaView>
  );
};

export default HomeScreen;
