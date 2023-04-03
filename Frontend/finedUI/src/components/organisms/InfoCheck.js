import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import {TextField } from 'rn-material-ui-textfield';
import SignUpText from '../atoms/SignUpText';
import { useRecoilState, useSetRecoilState } from 'recoil'
import { nameState, addressState } from '../../store/atoms/SignUpState'


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
  const setName = useSetRecoilState(nameState)
  const setAddress= useSetRecoilState(addressState)
  return(
    <View style={styles.inputView}>
      <SignUpText text={'회원가입'}/>
      <TextField
      labelTextStyle={{padding: 3}}
      autoCapitalize="none"
      inputContainerStyle={styles.inputContainer}
      label="이름"
      onChangeText={setName}
      />
      <TextField
      labelTextStyle={{padding: 3}}
      autoCapitalize="none"
      inputContainerStyle={styles.inputContainer}
      label="주소"
      onChangeText={setAddress}
      />
    </View>
  )
}
export default InfoCheck
