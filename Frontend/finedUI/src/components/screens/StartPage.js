import React from 'react';
import { StyleSheet, View } from 'react-native';
import Logo from '../atoms/Logo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

const StartPage = () => {
  return(
    <View style={styles.container}>
      <Logo />
    </View>
  )
}
export default StartPage