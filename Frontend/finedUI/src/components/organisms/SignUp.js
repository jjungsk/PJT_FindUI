import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import {TextField } from 'rn-material-ui-textfield';
import SignUpText from '../atoms/SignUpText';

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
  return(
    <View style={styles.inputView}>
      <SignUpText text={'회원가입'}/>
      <TextField
      labelTextStyle={{padding: 3}}
      inputContainerStyle={styles.inputContainer}
      autoCapitalize="none"
      label="이메일"
      />
      <TextField
      labelTextStyle={{padding: 3}}
      inputContainerStyle={styles.inputContainer}
      autoCapitalize="none"
      secureTextEntry={true}
      label="비밀번호"
      />
      <TextField
      labelTextStyle={{padding: 3}}
      inputContainerStyle={styles.inputContainer}
      secureTextEntry={true}
      autoCapitalize="none"
      label="비밀번호 확인"
      />
    </View>
  )
}
export default SignUp
