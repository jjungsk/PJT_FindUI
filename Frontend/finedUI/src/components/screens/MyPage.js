import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Alert,
  ScrollView,
  Modal,
  Pressable,
} from 'react-native';
import MyPageModal from '../atoms/MyPageModal';
import MyInfoCard from '../organisms/MyInfoCard';
import PreRegistCard from '../organisms/PreRegistCard';
import {Carousel} from 'react-native-basic-carousel';
import {widthPercentage} from '../../styles/ResponsiveSize';
import PwModal from '../organisms/PwModal';
import InfoModal from '../organisms/InfoModal';
import {getUserInfo, modifyInfo, deleteUser} from '../../API/UserApi';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {isLoginState, myInfoState} from '../../store/atoms/userState';
import {deleteTokensFromKeychain} from '../../store/keychain/loginToken';
import {reset} from '../navigator/NavigationService';
import {preInfoState} from '../../store/atoms/InfoState';
import NoRegistCard from '../organisms/NoRegistCard';
import {preSelector} from '../../store/selectors/RegistSelector';
import CallRegistContainer from '../organisms/CallRegistContainer';
import { changeMissing } from '../../API/PreRegistration';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 23,
    color: '#0A0A0A',
    // marginBottom: 30
  },
  subText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#0A0A0A',
    marginTop: 10,
  },
  line: {
    borderWidth: 0.5,
    borderColor: '#575757',
    height: 1,
    width: '100%',
  },
  carouselItem: {
    paddingHorizontal: widthPercentage(14),
  },
  button: {
    backgroundColor: '#1570EF',
    borderRadius: 10,
    // alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 10,
    padding: 10,
  },
});
const width = Dimensions.get('window').width;

const MyPage = ({navigation}) => {
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const [isWithdrawalVisible, setIsWithdrawalVisible] = useState(false);
  const [isPwVisible, setIsPwVisible] = useState(false);
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [myInfo, setMyInfo] = useRecoilState(myInfoState);
  const [address, setAddress] = useState(myInfo.address); // 주소
  const [phoneNumber, setPhoneNumber] = useState(myInfo.phone); // 이메일
  const [callRegistVisible, setCallRegistVisible] = useState(false); // 신고 추가 입력사항
  const [registId, setRegistId] = useState(0)
  const setIsLogin = useSetRecoilState(isLoginState);
  const registUsers = useRecoilValue(preSelector);
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
    setAddress(myInfo.address);
    setPhoneNumber(myInfo.phoneNumber);
  };

  const handleChangePassword = () => {
    //TODO: 비밀번호 변경 axios 작성하기!
    // 비밀번호 변경 로직
    if (newPassword === confirmPassword) {
      Alert.alert('비밀번호 변경 완료', '새로운 비밀번호가 저장되었습니다.');
      setModalVisible(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      Alert.alert(
        '비밀번호 변경 실패',
        '새로운 비밀번호와 확인 비밀번호가 일치하지 않습니다.',
      );
    }
  };

  const handleLogout = () => {
    // 실제 로그아웃 작업을 수행하는 코드
    setIsLogin(false);
    deleteTokensFromKeychain();
  };

  const handleWithdrawal = async () => {
    // 실제 회원탈퇴 작업을 수행하는 코드
    const response = await deleteUser();
    console.log(response);
    Alert.alert('회원 탈퇴', '회원 탈퇴되었습니다.');
    setIsLogin(false);
    deleteTokensFromKeychain();
  };

  const handleInfo = async () => {
    // 정보 변경 코드
    console.log(address, phoneNumber);
    const response = await modifyInfo(address, phoneNumber);
    if (response.status === 200) {
      Alert.alert('정보가 변경되었습니다.');
      setMyInfo(response.data);
      toggleInfoModal(false);
    }
  };
  useEffect(() => {
    const getMyInfo = () => {
      setAddress(myInfo.address);
      setPhoneNumber(myInfo.phoneNumber);
    };
    getMyInfo();
  }, []);

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={callRegistVisible}
        onRequestClose={() => {
          setCallRegistVisible(!callRegistVisible);
        }}>
        <Pressable
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.4)',
          }}
          onPress={() => setCallRegistVisible(!callRegistVisible)}
        />
        {/* confirmCallback return 경도 위도 데이터 */}
        <CallRegistContainer
          cancelCallback={({value}) => setCallRegistVisible(value)}
          confirmCallback={ async ({pos}) => {
            const response = await changeMissing(registId ,pos.lng, pos.lat)
            console.log(response)
            setCallRegistVisible(!callRegistVisible);
          }}
        />
      </Modal>
      <ScrollView style={{width: '100%'}}>
        <View
          style={{paddingHorizontal: widthPercentage(10), marginBottom: 10}}>
          <Text
            style={[
              styles.text,
              {marginBottom: 20, fontSize: 28, marginTop: 20},
            ]}>
            마이페이지
          </Text>
          <MyInfoCard myInfo={myInfo} onPress={toggleInfoModal} />
          <Text style={[styles.text, {marginBottom: 10, marginTop: 20}]}>
            사전 등록
          </Text>
          <View style={styles.line} />
        </View>
        {registUsers.length < 1 ? (
          <View style={styles.carouselItem}>
            <NoRegistCard textInfo={'등록된 사전 등록 정보가 없습니다.'} />
          </View>
        ) : (
          <Carousel
            data={registUsers}
            renderItem={({item}) => (
              <View style={styles.carouselItem}>
                <PreRegistCard
                  registUser={item}
                  navigation={navigation}
                  userInfo={myInfo}
                />
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    setCallRegistVisible(!callRegistVisible)
                    setRegistId(item.registId)
                    }}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 15,
                      fontWeight: 'bold',
                      alignSelf: 'center',
                    }}>
                    신고하기
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            itemWidth={width}
            pagination
          />
        )}
        <View
          style={{paddingHorizontal: widthPercentage(10), marginBottom: 40}}>
          <Text style={[styles.text, {marginBottom: 10, marginTop: 10}]}>
            계정관리
          </Text>
          <View style={styles.line} />
          <TouchableOpacity onPress={toggleLogoutModal}>
            <Text style={styles.subText}>로그아웃</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleWithdrawalModal}>
            <Text style={styles.subText}>회원탈퇴</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={togglePwModal}>
            <Text style={styles.subText}>비밀번호 변경</Text>
          </TouchableOpacity>
          <MyPageModal
            modalText={'로그아웃 하시겠습니까?'}
            visible={isLogoutModalVisible}
            onPress1={handleLogout}
            onPress2={toggleLogoutModal}
          />
          <MyPageModal
            modalText={'탈퇴 하시겠습니까?'}
            visible={isWithdrawalVisible}
            onPress1={handleWithdrawal}
            onPress2={toggleWithdrawalModal}
          />
          <View style={{alignSelf: 'flex-start'}}>
            <PwModal
              visible={isPwVisible}
              value1={currentPassword}
              value2={newPassword}
              value3={confirmPassword}
              onPress1={handleChangePassword}
              onPress2={togglePwModal}
              setCurrentPassword={setCurrentPassword}
              setNewPassword={setNewPassword}
              setConfirmPassword={setConfirmPassword}
            />
            <InfoModal
              visible={isInfoVisible}
              myInfo={myInfo}
              address={address}
              phoneNumber={phoneNumber}
              onPress1={handleInfo}
              onPress2={toggleInfoModal}
              setAddress={setAddress}
              setPhoneNumber={setPhoneNumber}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default MyPage;
