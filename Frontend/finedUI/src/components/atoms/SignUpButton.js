import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  signBtn:{
    width:"80%",
    backgroundColor:"#1570EF",
    borderRadius:5,
    alignItems:"center",
    justifyContent:"center",
    padding: 10,
    marginTop: 25,
    marginBottom: 13
  },
  signText:{
    color:"white",
    fontSize: 18,
    fontWeight: "bold"
  },
  checkbutton:{
    width:"80%",
    backgroundColor:"#d3d3d3",
    borderRadius:5,
    alignItems:"center",
    justifyContent:"center",
    padding: 10,
    marginTop: 25,
    marginBottom: 13
  },
})

const SignUpButton = ({signUpText, onPress, disabled}) => {
  return (
    <TouchableOpacity style={[styles.signBtn, disabled&&styles.checkbutton]} onPress={onPress} disabled={disabled}>
      <Text style={styles.signText}>{signUpText}</Text>
    </TouchableOpacity>
  );
};
export default SignUpButton