import React, {useState} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Alert } from 'react-native';
import MyPageModal from '../atoms/MyPageModal';
import MyInfoCard from '../organisms/MyInfoCard';
import PreRegistCard from '../organisms/PreRegistCard';
import {Carousel} from 'react-native-basic-carousel';
import {widthPercentage} from '../../styles/ResponsiveSize';
import PwModal from '../organisms/PwModal';
import InfoModal from '../organisms/InfoModal';
import { modifyInfo } from '../../API/AccountApi';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  text:{
    fontWeight:"bold",
    fontSize:23,
    color: "#0A0A0A",
    // marginBottom: 30
  },
  subText: {
    fontWeight:"bold",
    fontSize:18,
    color: "#0A0A0A",
    marginTop: 10
  },
  line: {
    borderWidth: 0.5,
    borderColor: "#575757",
    height: 1,
    width:"100%",
  },
  carouselItem: {
    paddingHorizontal: widthPercentage(9),
  },
})
const width = Dimensions.get('window').width;

const MyPage = () => {
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const [isWithdrawalVisible, setIsWithdrawalVisible] = useState(false);
  const [isPwVisible, setIsPwVisible] = useState(false);
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const myInfo = {
    name: '이한나',
    email: 'dlgkssk@ssafy.com',
    phone: '01022222222',
    address: '서울시 성북구 종암동'
  }
  const [address, setAddress] = useState(myInfo.address); // 주소
  const [phone, setPhone] = useState(myInfo.phone); // 이메일

  const [registUsers, setRegistUser] = useState([
    {
      name: '샘스미스',
      birthday: new Date(1997, 2, 18),
      address: '서울시 역삼동 멀티캠퍼스',
      phone: '010-6725-5590',
      image: null,
    },
    {
      name: '정둘권',
      birthday: new Date(1997, 2, 18),
      address: '서울시 역삼동 멀티캠퍼스',
      phone: '010-6725-5590',
      image: null,
    },
  ]);

  const toggleLogoutModal = () => {
    setIsLogoutModalVisible(!isLogoutModalVisible);
  };
  
  const toggleWithdrawalModal = () => {
    setIsWithdrawalVisible(!isWithdrawalVisible);
  };

  const togglePwModal = () => {
    setIsPwVisible(!isPwVisible);
  };

  const toggleInfoModal = () => {
    setIsInfoVisible(!isInfoVisible);
  };

  const handleChangePassword = () => {
    //TODO: 비밀번호 유효성 확인 로직 작성하기!
    // 비밀번호 변경 로직
    if (newPassword === confirmPassword) {
      Alert.alert('비밀번호 변경 완료', '새로운 비밀번호가 저장되었습니다.');
      setModalVisible(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      Alert.alert('비밀번호 변경 실패', '새로운 비밀번호와 확인 비밀번호가 일치하지 않습니다.');
    }
  };

  const handleLogout = () => {
    // 실제 로그아웃 작업을 수행하는 코드
  };
  
  const handleWithdrawal = () => {
    // 실제 회원탈퇴 작업을 수행하는 코드
  };

  const handleInfo = async () => {
    // 정보 변경 코드
    const response = await modifyInfo(myInfo.name, address, myInfo.email, phone)
    console.log(response)
    if (response.status === 200) {
      Alert.alert('정보가 변경되었습니다.');
      toggleInfoModal(false)
    }
  };

  return(
    <View style={styles.container}>
    <View style={{width: "90%"}}>
      <Text style={[styles.text, {marginBottom: 20, fontSize: 28}]}>마이페이지</Text>
      <MyInfoCard myInfo={myInfo} onPress={toggleInfoModal}/>
      {/* <Carousel
            data={registUsers}
            renderItem={({item}) => (
              <View style={styles.carouselItem}>
                <PreRegistCard registUser={item} />
              </View>
            )}
            itemWidth={width}
            pagination
          /> */}
      <Text style={[styles.text, {marginBottom: 10, marginTop: 20}]}>계정관리</Text>
      <View style={styles.line}/>
      <TouchableOpacity onPress={toggleLogoutModal}>
        <Text style={styles.subText}>로그아웃</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleWithdrawalModal}>
        <Text style={styles.subText}>회원탈퇴</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={togglePwModal}>
        <Text style={styles.subText}>비밀번호 변경</Text>
      </TouchableOpacity>
      <MyPageModal modalText={'로그아웃 하시겠습니까?'} visible={isLogoutModalVisible} onPress1={handleLogout} onPress2={toggleLogoutModal}/>
      <MyPageModal modalText={'탈퇴 하시겠습니까?'} visible={isWithdrawalVisible} onPress1={handleWithdrawal} onPress2={toggleWithdrawalModal}/>
      <View style={{alignSelf: 'flex-start'}}>
        <PwModal visible={isPwVisible} value1={currentPassword} value2={newPassword} value3={confirmPassword} onPress1={handleChangePassword} onPress2={togglePwModal}
          setCurrentPassword={setCurrentPassword} setNewPassword={setNewPassword} setConfirmPassword={setConfirmPassword}
        />
        <InfoModal visible={isInfoVisible} myInfo={myInfo} address={address} phone={phone} onPress1={handleInfo} onPress2={toggleInfoModal} setAddress={setAddress} setPhone={setPhone}/>
      </View>
    </View>
    </View>
    
  )
}
export default MyPage