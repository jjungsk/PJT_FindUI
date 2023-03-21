import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {UserBtn} from '../atoms/buttons';

const Test = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <UserBtn style={{flex: 1}}></UserBtn>
      <View
        style={{
          flex: 2,
          backgroundColor: 'green',
          justifyContent: 'center',
          alignItems: 'center',
        }}></View>
    </SafeAreaView>
  );
};

export {Test};
