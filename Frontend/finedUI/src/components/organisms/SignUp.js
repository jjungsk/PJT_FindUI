import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import { OutlinedTextField } from 'rn-material-ui-textfield';

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
      <OutlinedTextField
      inputContainerStyle={styles.inputContainer}
      label="이름"
      />
      <OutlinedTextField
      label="생년월일"
      titleTextStyle={{marginBottom:5}}
      title="YYYY/MM/DD 형식으로 입력해주세요."
      />
      <OutlinedTextField
      inputContainerStyle={styles.inputContainer}
      label="연락처"
      />
      <OutlinedTextField
      inputContainerStyle={styles.inputContainer}
      label="이메일"
      />
      <OutlinedTextField
      inputContainerStyle={styles.inputContainer}
      autoCapitalize="none"
      secureTextEntry={true}
      label="비밀번호"
      />
      <OutlinedTextField
      inputContainerStyle={styles.inputContainer}
      label="비밀번호 확인"
      />
      <OutlinedTextField
      inputContainerStyle={styles.inputContainer}
      label="주소"
      />
    </View>
  )
}
export default SignUp
