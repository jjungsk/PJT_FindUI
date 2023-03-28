import React, {useState} from 'react';
import {TextInput, View, Text} from 'react-native';
import SockJsClient from 'react-stomp';
import LoginForm from '../organisms/LoginForm';
import Messages from '../organisms/Messages';

const SOCKET_URL = 'http://localhost:8080/ws-chat/';
const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);

  let onConnected = () => {
    console.log('Connected');
  };

  let onMessageReceived = msg => {
    console.log('message받음', msg);
    setMessages(messages.concat(msg));
  };
  let onSendMessage = msgText => {
    console.log(msgText);
  };
  let handleLoginSubmit = username => {
    console.log('LOGIN', username);
    setUser({username: username, color: 'red'});
  };
  return (
    <View className="App">
      {!!user ? (
        <>
          <SockJsClient
            url={SOCKET_URL}
            topics={['/topic/group']}
            onConnect={onConnected}
            onDisconnect={console.log('Disconnected!')}
            onMessage={msg => onMessageReceived(msg)}
            debug={false}
          />
          <Messages messages={messages} currentUser={user} />
          <TextInput onSendMessage={onSendMessage} />
        </>
      ) : (
        <LoginForm onSubmit={handleLoginSubmit} />
      )}
      {/* <Text>Hi</Text> */}
    </View>
  );
};
export default ChatScreen;
