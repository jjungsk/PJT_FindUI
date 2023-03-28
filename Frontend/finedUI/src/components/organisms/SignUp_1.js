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

const SignUp_1 = () => {
  return(
    <View style={styles.inputView}>
      <SignUpText />
      <TextField
      labelTextStyle={{padding: 3}}
      inputContainerStyle={styles.inputContainer}
      label="이름"
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
      label="비밀번호 확인"
      />
    </View>
  )
}
export default SignUp_1
