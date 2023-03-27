import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  loginBtn:{
    width:"80%",
    backgroundColor:"#1570EF",
    borderRadius:10,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:10,
    marginBottom:10
  },
  loginText:{
    color:"white",
    fontSize: 18,
    fontWeight: "bold"
  }
})

const LoginButton = ({signUpText}) => {
  return (
    <TouchableOpacity style={styles.loginBtn}>
      <Text style={styles.loginText}>{signUpText}</Text>
    </TouchableOpacity>
  );
};
export default LoginButton