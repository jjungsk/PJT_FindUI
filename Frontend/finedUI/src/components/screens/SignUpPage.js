import React from 'react';
import { StyleSheet, View } from 'react-native';
import SignUp_1 from '../organisms/SignUp_1';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: 55
  }
})

const SignUpPage = () => {
  return(
    <View style={styles.container}>
      <SignUp_1/>
    </View>
  )
}
export default SignUpPage