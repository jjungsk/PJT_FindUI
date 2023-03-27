import React from 'react';
import {FlatList} from 'react-native';
const list = [
  {id: 1, name: '김xx'},
  {id: 2, name: '이xx'},
  {id: 3, name: '박xx'},
];
const ChatRoomList = () => {
  // 채팅방 있는 만큼 정보 넣어서 뿌리기
  <View>
    <FlatList
      data={list}
      renderItem={() => {
        <ChatRoom>{item.name}</ChatRoom>;
      }}
    />
  </View>;
};
export default ChatRoomList;
