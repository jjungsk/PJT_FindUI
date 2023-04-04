import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import {TextField } from 'rn-material-ui-textfield';
import SignUpText from '../atoms/SignUpText';
import { useSetRecoilState } from 'recoil'
import { emailState, passwordState, pwConfirmState } from '../../store/atoms/SignUpState'

const styles = StyleSheet.create({
  inputView:{
    width:"80%",
    justifyContent:"center",
  },
  inputContainer: {
    marginBottom: 10
  },
  label: {
    color: "#ffffff"
  }
})

const SignUp = () => {
  const setEmail = useSetRecoilState(emailState)
  const setPassword = useSetRecoilState(passwordState)
  const setPasswordConfirm = useSetRecoilState(pwConfirmState)
  return(
    <View style={styles.inputView}>
      <SignUpText text={'회원가입'}/>
      <TextField
      labelTextStyle={{padding: 3}}
      inputContainerStyle={styles.inputContainer}
      autoCapitalize="none"
      label="이메일"
      onChangeText={setEmail}
      />
      <TextField
      labelTextStyle={{padding: 3}}
      inputContainerStyle={styles.inputContainer}
      autoCapitalize="none"
      secureTextEntry={true}
      label="비밀번호"
      onChangeText={setPassword}
      />
      <TextField
      labelTextStyle={{padding: 3}}
      inputContainerStyle={styles.inputContainer}
      secureTextEntry={true}
      autoCapitalize="none"
      label="비밀번호 확인"
      onChangeText={setPasswordConfirm}
      />
    </View>
  )
}
export default SignUp
