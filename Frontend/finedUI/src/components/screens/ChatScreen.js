import React, {useState, useCallback} from 'react';
import {
  TextInput,
  SafeAreaView,
  StyleSheet,
  Pressable,
  View,
  Text,
  FlatList,
} from 'react-native';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {useFocusEffect} from '@react-navigation/native';
import {widthPercentage, heightPercentage} from '../../styles/ResponsiveSize';
const styles = StyleSheet.create({
  messageBox: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    backgroundColor: '#B2DDFF',
    height: heightPercentage(42),
    width: widthPercentage(360),
    justifyContent: 'center',
    alignItems: 'center',
  },
  msgBtn: {
    backgroundColor: '#2E90FA',
    width: widthPercentage(40),
    height: heightPercentage(42),
  },
  msgInput: {
    width: widthPercentage(300),
    height: heightPercentage(35),
    backgroundColor: '#84CAFF',
    borderRadius: 15,
  },
  btnTxt: {
    textAlign: 'center',
  },
});
const SOCKET_URL = 'http://172.26.0.1:8080/ws';
let sockJS = new SockJS(SOCKET_URL);
let stompClient = Stomp.over(sockJS);
const ChatScreen = () => {
  const [messages, setMessages] = useState('');
  const [user, setUser] = useState(null);

  useFocusEffect(
    useCallback(() => {
      stompClient.connect({}, onConnected, onError);
      return () => {
        //연결끊기
        console.log('다른 화면으로 넘어갔어요.');
      };
    }, []),
  );
  let onError = err => {
    console.log(err);
  };
  let onConnected = () => {
    //subscribe에서roomid로 하면 될 듯
    stompClient.subscribe('/topic/public', onMessageReceived);

    console.log('Connected');
    // Tell your username to the server
    stompClient.send(
      '/app/chat.addUser',
      {},
      JSON.stringify({sender: username, type: 'JOIN'}),
    );

    connectingElement.classList.add('hidden');
  };

  let onMessageReceived = msg => {
    // var message = JSON.parse(payload.body);
    // console.log(message);
    setMessages(messages.concat(msg));
  };

  let onSendMessage = payload => {
    console.log(payload.body);

    console.log('Click' + messages);
  };
  let handleLoginSubmit = username => {
    console.log('LOGIN', username);
    setUser({username: username, color: 'red'});
  };
  return (
    <View
      style={{
        padding: 5,
        flexGrow: 1,
      }}>
      <FlatList
        renderItem={() => {
          for (let i = 0; i < 30; i++) {
            <Text>i</Text>;
          }
        }}
      />

      <SafeAreaView style={styles.messageBox}>
        <Pressable onPress={onSendMessage}>
          <Icon
            name="plus"
            size={30}
            style={{width: 30, height: 30}}
            color="black"
          />
        </Pressable>
        <TextInput
          style={styles.msgInput}
          value={messages}
          onChangeText={onMessageReceived}
        />
        <Pressable onPress={onSendMessage}>
          <Icon
            name="arrow-up"
            size={30}
            style={{width: 30, height: 30}}
            color="black"
          />
        </Pressable>
      </SafeAreaView>
    </View>
  );
};
export default ChatScreen;
