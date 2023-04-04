import React from "react";
import { Text, TouchableOpacity, StyleSheet, Image, View } from "react-native";

const styles = StyleSheet.create({
  kakaoStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff115",
    borderWidth: 0.5,
    borderColor: "#fff115",
    height: 40,
    width: 220,
    borderRadius: 5,
    margin: 5
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

const KakaoButton = () => {
  return(
    <TouchableOpacity
      style={styles.kakaoStyle}
    >
      <Image
        source={require("../../assets/kakao.png")}
        style={styles.imageIconStyle}
      />
      <Text style={styles.textStyle}>
        카카오 로그인
      </Text>
    </TouchableOpacity>
  )
}
export default KakaoButton