import React from 'react';
import { StyleSheet, ScrollView, Text} from 'react-native';
import SignUp from '../organisms/SignUp';
import Logo from '../atoms/Logo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

const SignUpPage = () => {
  return(
    <ScrollView contentContainerStyle={styles.container}>
      <Logo />
      <SignUp />
    </ScrollView>
  )
}
export default SignUpPage