import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {Test} from './src/components/screens/test';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Test></Test>
    </SafeAreaView>
  );
};

export default App;
