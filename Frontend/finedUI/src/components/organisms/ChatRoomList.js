import React, {useState, useEffect} from 'react';
import {FlatList, View} from 'react-native';
import ChatRoom from './ChatRoom';
import {apiGetChatRooms} from '../../API/apiChat';
import {apiGetProfile} from '../../API/apiGetProfile';
const ChatRoomList = ({navigation}) => {
  const [dataList, setDataList] = useState([]);
  const [profile, setProfile] = useState('');

  const roomList = async () => {
    await apiGetChatRooms().then(({data}) => {
      // TODO 마지막 메시지 저장하게 바꿔야됨
      // setLastMsg(data.last);
      setDataList([...data.data]);
      console.log(dataList);
    });
  };
  // const profile = async () => {
  //   await apiGetProfile().then({data});
  // };
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
