import React from 'react';
import {View} from 'react-native';

const Messages = ({messages, currentUser}) => {
  let renderMessage = message => {
    const {sender, content, color} = message;
    const messageFromMe = currentUser.username === message.sender;
    const className = messageFromMe
      ? 'Messages-message currentUser'
      : 'Messages-message';
    return (
      <View className={className}>
        <View className="Message-content">
          <View className="username">{sender}</View>
          <View className="text">{content}</View>
        </View>
      </View>
    );
  };
  return (
    <View className="messages-list">
      {messages.map(msg => renderMessage(msg))}
    </View>
  );
};
export default Messages;
