import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import SignUp from '../organisms/SignUp';
import Logo from '../atoms/Logo';
import SignUpButton from '../atoms/SignUpButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 55
  }
})

const SignUpPage = () => {
  return(
    <ScrollView contentContainerStyle={styles.container}>
      <Logo />
      <SignUp />
      <SignUpButton />
    </ScrollView>
  )
}
export default SignUpPage