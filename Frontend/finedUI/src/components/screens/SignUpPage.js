import React from 'react';
import { StyleSheet, View } from 'react-native';
import SignUpButton from '../atoms/SignUpButton';
import SignUp from '../organisms/SignUp';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: 55
  }
})

const SignUpPage = ({signUp}) => {
  return(
    <View style={styles.container}>
      <SignUp/>
      <SignUpButton 
        onPress={signUp}
        signUpText={'회원가입'}
      />
    </View>
  )
}
export default SignUpPage