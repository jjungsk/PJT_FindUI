import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Alert, Text, StyleSheet } from 'react-native';
import { useRecoilState } from 'recoil'
import { phoneState } from '../../store/atoms/SignUpState'
import { sendVerifyCode, verifyPhoneNumber } from '../../API/PhoneApi';
import { phoneCheckState } from '../../store/atoms/SignUpState';

const styles = StyleSheet.create({
  phoneView:{
    width:"80%",
    justifyContent:"center",
    marginBottom: 16
  },
  button:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1570EF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 13
  },
  checkbutton:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d3d3d3',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 13
  },
  buttonText:{
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18
  },
})
const phoneRegex = /^\d{10,11}$/;

const PhoneVerify = () => {
  const [phone, setPhone] = useRecoilState(phoneState);
  const [verifyCode, setVerifyCode] = useState('');
  const [verifyCodeSent, setVerifyCodeSent] = useState(false);
  const [verifyCodeMail, setVerifyCodeMail] = useRecoilState(phoneCheckState);
  const [remainingTime, setRemainingTime] = useState(0);
  const [selectedCarrier, setSelectedCarrier] = useState('');

  const phoneNumCheck = async () => {
    if (!phoneRegex.test(phone)) {
      Alert.alert('전화번호를 올바르게 입력하세요.');
      return;
    }
    if (!selectedCarrier) {
      Alert.alert('통신사를 선택하세요.');
      return;
    }

    const response = await sendVerifyCode(phone);
    if (response.success) {
      Alert.alert('인증 코드가 전송되었습니다.');
      setVerifyCodeSent(true); // 인증 코드 전송 완료 상태로 변경
      setRemainingTime(300); // 5분 타이머 시작
    } else {
      Alert.alert('인증 코드 전송에 실패했습니다.');
    }
  };

  const verifySecretNumber = async () => {
    if (verifyCode.trim() === '') {
      Alert.alert('인증번호를 올바르게 입력하세요.');
      return;
    }

    const response = await verifyPhoneNumber(phone, verifyCode);
    if (response.success) {
      setVerifyCodeMail(true)
      Alert.alert('전화번호 인증에 성공했습니다.');
    } else {
      Alert.alert('전화번호 인증에 실패했습니다.');
    }
  };
  useEffect(() => {
    let interval;
    if (verifyCodeSent && remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime(prevTime => prevTime - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [verifyCodeSent, remainingTime]);

  const formatRemainingTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <View style={styles.phoneView}>
      <View style={{ flexDirection: 'row', marginBottom: 16, marginLeft: 5, alignItems: 'center'}}>
        <Text style={{ marginRight: 20, fontSize: 15 }}>통신사 선택:</Text>
        <TouchableOpacity onPress={() => setSelectedCarrier('SKT')} style={{ marginRight: 20 }}>
          <Text style={{ color: selectedCarrier === 'SKT' ? 'blue' : 'black', fontSize: 16 }}>SKT</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedCarrier('KT')} style={{ marginRight: 20 }}>
          <Text style={{ color: selectedCarrier === 'KT' ? 'blue' : 'black', fontSize: 16 }}>KT</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedCarrier('U+')}>
          <Text style={{ color: selectedCarrier === 'U+' ? 'blue' : 'black', fontSize: 16 }}>U+</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        placeholder="전화번호를 입력하세요."
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
        style={{fontSize: 18}}
      />
      <TouchableOpacity
        style={[styles.button, verifyCodeSent&&styles.checkbutton]}
        onPress={phoneNumCheck}
      >
        <Text style={styles.buttonText}>인증 번호 받기</Text>
      </TouchableOpacity>
      {verifyCodeSent && remainingTime > 0 && (
        <>
          <TextInput
            style={{fontSize: 18}}
            placeholder="인증 번호를 입력하세요."
            keyboardType="numeric"
            value={verifyCode}
            onChangeText={setVerifyCode}
          />
          <TouchableOpacity
            style={[styles.button, verifyCodeMail&&styles.checkbutton]}
            onPress={verifySecretNumber}
          >
            <Text style={styles.buttonText}>인증 번호 확인</Text>
          </TouchableOpacity>
          <Text>남은 시간: {formatRemainingTime(remainingTime)}</Text>
        </>
      )}
    </View>
  );
};

export default PhoneVerify
