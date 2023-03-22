import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import LoginButton from '../atoms/LoginButton';
import LoginInput from '../atoms/LoginInput';
import Logo from '../atoms/Logo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '',
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgot:{
    color:"white",
    fontSize:11
  },
  loginText:{
    color:"white"
  }
});

const LoginPage = () => {
    return (
      <View style={styles.container}>
      <Logo />
      <LoginInput placeholderItem="email"></LoginInput>
      <LoginInput placeholderItem="password"></LoginInput>
      <TouchableOpacity style={styles.forgot}>
        <Text>Forgot Password?</Text>
      </TouchableOpacity>
      <LoginButton />
      <TouchableOpacity style={styles.loginText}>
        <Text>Signup</Text>
      </TouchableOpacity>
      </View>
    );
}

export default LoginPage