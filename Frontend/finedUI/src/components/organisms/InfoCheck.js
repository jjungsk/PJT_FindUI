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

const InfoCheck = () => {
  return(
    <View style={styles.inputView}>
      <SignUpText text={'회원가입'}/>
      <TextField
      labelTextStyle={{padding: 3}}
      autoCapitalize="none"
      inputContainerStyle={styles.inputContainer}
      label="이름"
      />
      <TextField
      labelTextStyle={{padding: 3}}
      autoCapitalize="none"
      inputContainerStyle={styles.inputContainer}
      label="주소"
      />
    </View>
  )
}
export default InfoCheck
