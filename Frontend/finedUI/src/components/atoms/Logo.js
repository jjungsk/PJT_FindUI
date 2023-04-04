import React from 'react';
import {Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#1570ef",
    marginBottom:40
  },
})

const Logo = () => {
  return (
    <Text style={styles.logo}>FinedUI</Text>
  );
};
export default Logo