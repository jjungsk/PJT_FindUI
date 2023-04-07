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
      getProfile();

      setDataList([...data.data, profile]);
      console.log(dataList);
    });
  };
  const getProfile = async () => {
    await apiGetProfile().then(({data}) => {
      setProfile(data.imagePath);
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
          <ChatRoom
            navigation={navigation}
            roomId={item.roomId}
            missing={item.registName}
            profile={item.profile}
          />
        )}
      />
    </View>
  );
};
export default ChatRoomList;
