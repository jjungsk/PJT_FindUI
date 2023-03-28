import React from 'react';
import {FlatList, View} from 'react-native';
import ChatRoom from './ChatRoom';
const ChatRoomList = ({navigation}) => {
  const list = [
    {id: 1, name: '김xx'},
    {id: 2, name: '이xx'},
    {id: 3, name: '박xx'},
  ];

  // 채팅방 있는 만큼 정보 넣어서 뿌리기
  return (
    <View>
      <FlatList
        data={list}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <ChatRoom navigation={navigation} sender={item.name} />
        )}
      />
    </View>
  );
};
export default ChatRoomList;
