import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  sign:{
    fontWeight:"bold",
    fontSize:25,
    color:"#1570ef",
    marginBottom:40
  },
})

const SignUpText = () => {
  <View>
    <Text style={styles.sign}>입력한 정보가 맞다면</Text>
    <Text style={styles.sign}>아래 확인 버튼을 눌러주세요.</Text>
  </View>
}
export default SignUpText