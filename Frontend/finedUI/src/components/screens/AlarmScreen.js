import React from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';

const AlarmScreen = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text>알람 페이지</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AlarmScreen;
