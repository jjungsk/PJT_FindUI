import React, {useState, useCallback} from 'react';
import {TextInput, View, Text, StyleSheet, Pressable} from 'react-native';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import SockJsClient from 'react-stomp';
import LoginForm from '../organisms/LoginForm';
import Messages from '../organisms/Messages';
import {useFocusEffect} from '@react-navigation/native';

const styles = StyleSheet.create({
  messageBox: {
    borderWidth: 2,
  },
});
const SOCKET_URL = 'http://172.26.0.1:8080/ws';
// const SOCKET_URL = 'http://localhost:8080/ws-chat';
let sockJS = new SockJS('http://172.26.0.1:8080/ws');
let stompClient = Stomp.over(sockJS);
const ChatScreen = () => {
  const [messages, setMessages] = useState('');
  const [user, setUser] = useState(null);
  // var socket = new SockJS('/ws-chat');

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
    <View style={styles.messageBox}>
      <TextInput value={messages} onChangeText={onMessageReceived} />
      <Pressable onPress={onSendMessage}>
        <Text>Send</Text>
      </Pressable>
    </View>
  );
};
export default ChatScreen;
