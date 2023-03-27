import React from 'react';
const styles = StyleSheet.create({
  profile: {
    width: 50,
    height: 50,
  },
  views: {
    width: 30,
    height: 30,
    borderRadius: 100,
    backgroundColor: 'cornflowerblue ',
  },
});
const ChatRoom = () => {
  return (
    <View>
      <Image style={styles.profile} />
      <Text>김돌이</Text>
      <Text>지금 어디 신가요?</Text>
      <Text>16:25</Text>
      <View style={style.views}>3</View>
    </View>
  );
};

export default ChatRoom;
