import React, {useState, useEffect} from 'react';
import {FlatList, View} from 'react-native';
import ChatRoom from './ChatRoom';
import {apiGetChatRooms} from '../../API/apiChat';
const ChatRoomList = ({navigation}) => {
  const [dataList, setDataList] = useState([]);
  const userId = 1;
  const roomList = async () => {
    await apiGetChatRooms(userId).then(({data}) => {
      // TODO 마지막 메시지 저장하게 바꿔야됨
      // setLastMsg(data.last);
      setDataList([...data.data]);
      console.log(dataList);
    });
  };
  useEffect(() => {
    roomList();
    console.log('실행됨');
  }, []);

  // 채팅방 있는 만큼 정보 넣어서 뿌리기
  return (
    <View>
      <FlatList
        data={dataList}
        keyExtractor={item => item.roomId}
        renderItem={({item}) => (
          <ChatRoom navigation={navigation} roomName={item.roomName} />
        )}
      />
    </View>
  );
};
export default ChatRoomList;
