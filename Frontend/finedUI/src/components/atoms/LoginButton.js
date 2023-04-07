import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  loginBtn:{
    width:"80%",
    backgroundColor:"#1570EF",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:25,
    marginBottom:10
  },
  loginText:{
    color:"white",
    fontSize: 18,
    fontWeight: "bold"
  }
})

const LoginButton = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.loginBtn} onPress={onPress}>
      <Text style={styles.loginText}>로그인</Text>
    </TouchableOpacity>
  );
};
export default LoginButton