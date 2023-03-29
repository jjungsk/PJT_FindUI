import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import LoginButton from '../atoms/LoginButton';
import LoginInput from '../atoms/LoginInput';
import GoogleButton from '../atoms/GoogleButton';
import KakaoButton from '../atoms/KakaoButton';
import Logo from '../atoms/Logo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '',
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgot: {
    // color:"white",
    fontSize: 11,
    marginTop: 20,
  },
  signText: {
    marginBottom: 20,
    fontSize: 18,
  },
  line: {
    borderWidth: 0.5,
    borderColor: '#575757',
    margin: 10,
    height: 1,
    width: '80%',
    marginBottom: 20,
  },
  font: {
    fontWeight: '600',
  },
});

const LoginPage = () => {
  return (
    <View style={styles.container}>
      <Logo />
      <LoginInput placeholderItem="이메일"></LoginInput>
      <LoginInput placeholderItem="비밀번호"></LoginInput>
      <LoginButton />
      <TouchableOpacity style={styles.signText}>
        <Text style={styles.font}>회원가입</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.forgot}>
        <Text style={styles.font}>비밀번호 찾기</Text>
      </TouchableOpacity>
      <View style={styles.line} />
      <GoogleButton />
      <KakaoButton />
    </View>
  );
};

export default LoginPage;
