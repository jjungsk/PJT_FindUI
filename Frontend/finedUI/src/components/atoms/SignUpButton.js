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
  }
})

const SignUpButton = ({signUpText, nextPage, page}) => {
  console.log(page)
  return (
    <TouchableOpacity style={styles.signBtn} onPress={() => nextPage({page: page+1})}>
      <Text style={styles.signText}>{signUpText}</Text>
    </TouchableOpacity>
  );
};
export default SignUpButton