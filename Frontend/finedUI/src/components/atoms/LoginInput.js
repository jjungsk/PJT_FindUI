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
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"white"
  },
})


const LoginInput = ({placeholderItem}) => {
  return (
    <View style={styles.inputView}>
      <TextInput
        style={styles.inputText}
        placeholder={placeholderItem}
        placeholderTextColor="#003f5c"
        >
      </TextInput>
    </View>
  );
};
export default LoginInput;
