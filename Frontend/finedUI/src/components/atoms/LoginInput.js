import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';

const styles = StyleSheet.create({
  inputView:{
    width:"80%",
    // 색상 변경하기
    // backgroundColor:"#465881",
    borderWidth: 2,
    borderColor: "#2e90fa",
    borderRadius:25,
    height:50,
    marginBottom:16,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color: "#0A0A0A",
    fontSize:18
  },
})


const LoginInput = ({placeholderItem, value, onChangeText}) => {
  return (
    <View style={styles.inputView}>
      <TextInput
        style={styles.inputText}
        placeholder={placeholderItem}
        placeholderTextColor="#003f5c"
        value={value}
        onChangeText={onChangeText}
        >
      </TextInput>
    </View>
  );
};
export default LoginInput;
