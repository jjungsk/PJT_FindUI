import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    width:"80%",
    alignSelf: "center",
    zIndex: 999,
  },
  button: {
    backgroundColor:"#1570EF",
    borderRadius:5,
    alignItems:"center",
    justifyContent:"center",
    padding: 10,
    marginTop: 25,
    marginBottom: 13
  },
  btnText:{
    color:"white",
    fontSize: 18,
    fontWeight: "bold"
  }
});

const FloatingButton = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.btnText}>제보자 신고하기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FloatingButton;