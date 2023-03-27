import React from 'react';

import ChatList from '../organisms/ChatRoomList';

const ChatListScreen = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ChatList />
    </SafeAreaView>
  );
};

export default ChatListScreen;
