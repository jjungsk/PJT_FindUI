import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {heightPercentage, widthPercentage} from '../../styles/ResponsiveSize';

const styles = StyleSheet.create({
  profile: {
    width: widthPercentage(50),
    height: heightPercentage(50),
  },
  profileContent: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  read: {
    width: widthPercentage(25),
    height: heightPercentage(25),
    backgroundColor: '#0BA5EC',
    borderRadius: 50,
  },
  container: {
    flex: 1,
    borderWidth: 2,
    marginBottom: 10,
    borderColor: '#0BA5EC',
    borderRadius: 15,
    width: widthPercentage(340),
    height: heightPercentage(70),
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#ffffff',
    textAlign: 'center',
    height: heightPercentage(25),
    fontSize: 16,
  },
  content: {
    width: widthPercentage(250),
    height: heightPercentage(60),
    justifyContent: 'center', //Centered horizontally
    paddingHorizontal: 8,
  },
  info: {
    height: heightPercentage(60),
  },
  sender: {
    fontWeight: '600',
    fontSize: 16,
    height: heightPercentage(30),
    color: '#000000',
  },
  infoUp: {
    height: heightPercentage(35),
    width: widthPercentage(30),
    justifyContent: 'center',
    alignContent: 'center',
  },
  infoText: {
    fontSize: 11,
  },
});

const ChatRoom = ({sender, navigation}) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
      <View style={styles.container}>
        <View style={styles.profile}>
          <Image style={styles.profileContent} />
        </View>
        <View style={styles.content}>
          <Text style={styles.sender}>{sender}</Text>
          <Text>지금 어디 신가요?</Text>
        </View>
        <View style={styles.info}>
          <View style={styles.infoUp}>
            <Text style={styles.infoText}>16:25</Text>
          </View>
          <View style={styles.read}>
            <Text style={styles.text}>3</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatRoom;
