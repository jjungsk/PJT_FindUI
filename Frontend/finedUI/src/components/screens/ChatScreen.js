import React, {useState, useCallback} from 'react';
import {
  TextInput,
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
  // messageBox: {
  //   position: 'absolute',
  //   bottom: 0,
  //   flexDirection: 'row',
  //   backgroundColor: '#B2DDFF',
  //   height: heightPercentage(42),
  //   width: widthPercentage(360),
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  messageBox: {
    marginHorizontal: 10,
    flexDirection: 'row',
    marginBottom: 80,
  },
  list: {
    height: '80%',
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
  myChat: {
    alignSelf: 'flex-end',
    padding: 10,
    color: 'white',
    backgroundColor: 'blue',
    fontSize: 16,
    borderRadius: 20,
    marginVertical: 10,
  },
  otherChat: {
    alignSelf: 'flex-start',
    padding: 10,
    color: 'white',
    backgroundColor: 'gray',
    fontSize: 16,
    borderRadius: 20,
    marginVertical: 10,
  },
});
const SOCKET_URL = 'http://10.0.2.2:8080/ws';
let sockJS = new SockJS(SOCKET_URL);
let stompClient = Stomp.over(sockJS);
let serverMessagesList = [];
const ChatScreen = () => {
  const [messages, setMessages] = useState('');
  const [user, setUser] = useState(null);
  //보낸 메시지 리스트
  const [serverMessages, setServerMessages] = useState([]);

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
  let onChangeInput = msg => {
    setMessages(msg);
  };
  let onSendMessage = payload => {
    console.log(payload.body);
    console.log('메시지 보낸다' + messages);
    var chatMessage = {
      sender: 'z',
      message: messages,
      type: 'CHAT',
    };
    var chat = {
      id: serverMessagesList.length,
      sender: 'zz',
      message: messages,
      type: 'CHAT',
      roomId: 1,
    };
    serverMessagesList.push(chat);
    console.log('push후', serverMessagesList);
    setServerMessages([...serverMessagesList]);
    console.log('msgList', serverMessagesList, serverMessages);
    stompClient.send(
      '/app/chat.sendMessage/1',
      {},
      JSON.stringify(chatMessage),
    );
    setMessages('');
  };
  let sendImg = () => {
    console.log('이미지 로직');
  };
  let handleLoginSubmit = username => {
    console.log('LOGIN', username);
    setUser({username: username, color: 'red'});
  };
  return (
    <View>
      <View
        style={{
          padding: 5,
          flexGrow: 1,
        }}>
        <FlatList
          style={styles.list}
          contentContainerStyle={{paddingBottom: 50}}
          data={serverMessages}
          keyExtractor={item => item.id}
          renderItem={({item}) =>
            item.sender == 'minji' ? (
              <Text style={styles.myChat}>{item.message}</Text>
            ) : (
              <Text style={styles.otherChat}>{item.message}</Text>
            )
          }
        />
      </View>
      <View style={styles.messageBox}>
        <Pressable onPress={sendImg}>
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
          onChangeText={onChangeInput}
        />
        <Pressable onPress={onSendMessage}>
          <Icon
            name="arrow-up"
            size={30}
            style={{width: 30, height: 30}}
            color="black"
          />
        </Pressable>
      </View>
    </View>
  );
};
export default ChatScreen;
