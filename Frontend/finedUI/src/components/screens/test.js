import React from 'react';
import {SafeAreaView, View, TextInput, StyleSheet} from 'react-native';
import PreRegistCard from '../organisms/PreRegistCard';

const Test = () => {
  return (
    <View style={styles.testContainer}>
      <PreRegistCard></PreRegistCard>
    </View>
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
