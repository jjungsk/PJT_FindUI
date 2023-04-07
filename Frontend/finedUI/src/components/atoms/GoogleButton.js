import React from "react";
import { Text, TouchableOpacity, StyleSheet, Image, View } from "react-native";

const styles = StyleSheet.create({
  googleStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderWidth: 0.5,
    borderColor: "#fff",
    height: 40,
    width: 220,
    borderRadius: 5,
    margin: 5,
  },
  imageIconStyle: {
    padding: 10,
    marginLeft: 15,
    height: 25,
    width: 25,
    resizeMode: "stretch"
  },
  textStyle: {
    color: "#575757",
    marginLeft: 15,
    marginRight: 20,
    fontSize: 16,
    fontWeight: "700"
  }
});

const GoogleButton = ({onPress}) => {
  return(
    <TouchableOpacity
      style={styles.googleStyle}
      onPress={onPress}
    >
      <Image
        source={require("../../assets/google.png")}
        style={styles.imageIconStyle}
      />
      <Text style={styles.textStyle}>
        구글 로그인
      </Text>
    </TouchableOpacity>
  )
}
export default GoogleButton