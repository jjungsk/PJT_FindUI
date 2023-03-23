import React from 'react';
import {SafeAreaView, View, TextInput, StyleSheet} from 'react-native';
import PreRegistCard from '../organisms/PreRegistCard';

const Test = () => {
  const registUser = {
    name: '샘스미스',
    birthday: new Date(1997, 2, 18),
    address: '서울시 역삼동 멀티캠퍼스',
    phone: '010-6725-5590',
  };

  return (
    <SafeAreaView style={styles.testContainer}>
      <PreRegistCard registUser={registUser}></PreRegistCard>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  testContainer: {
    flex: 1,
    margin: 20,
    justifyContent: 'center',
  },
});

export {Test};
