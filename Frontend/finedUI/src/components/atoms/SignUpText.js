import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  sign:{
    fontWeight:"bold",
    fontSize:23,
    color: "#0A0A0A"
  },
})

const SignUpText = () => {
  return(
    <Text style={styles.sign}>입력한 정보가 맞다면 {"\n"}아래 확인 버튼을 눌러주세요.</Text>
  )
}
export default SignUpText