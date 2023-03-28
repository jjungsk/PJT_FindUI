import React from 'react';
import {SafeAreaView} from 'react-native';

import ChatRoomList from '../organisms/ChatRoomList';

const ChatListScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ChatRoomList navigation={navigation} />
    </SafeAreaView>
  );
};

export default ChatListScreen;
