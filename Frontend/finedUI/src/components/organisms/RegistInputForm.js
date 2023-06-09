import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  fontPercentage,
  heightPercentage,
  widthPercentage,
} from '../../styles/ResponsiveSize';

// recoil
import {useRecoilState, useRecoilValue} from 'recoil';
import {
  registName,
  registBirth,
  registMissingDate,
  registMode,
} from '../store_regist/registStore';

import {format} from 'date-fns';
import ko from 'date-fns/esm/locale/ko/index.js';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CustomInputField from '../atoms/CustomInputField';

import SelectGender from './SelectGender';
import Divider from '../atoms/Divider';

const RegistInputForm = ({userInfo = null}) => {
  // 1. 이름
  const [userName, setUserName] = useRecoilState(registName);
  // 2. 생년월일 8자리
  const [birthDay, setBirthday] = useRecoilState(registBirth);
  // 6. 실종 날짜
  const [missingDate, setMissingDate] = useRecoilState(registMissingDate);
  const [pickerMode, setPickerMode] = useState('date');
  const [visible, setVisible] = useState(false);
  const mode = useRecoilValue(registMode);

  const onPressDate = () => {
    // 날짜 클릭 시
    setPickerMode('date'); // 모달 유형을 date로 변경
    setVisible(true); // 모달 open
  };

  const onPressTime = () => {
    // 시간 클릭 시
    setPickerMode('time'); // 모달 유형을 time으로 변경
    setVisible(true); // 모달 open
  };

  const onConfirm = selectedDate => {
    // 날짜 또는 시간 선택 시
    setVisible(false); // 모달 close
    setMissingDate(selectedDate); // 선택한 날짜 변경
  };

  const onCancel = () => {
    // 취소 시
    setVisible(false); // 모달 close
  };

  // useEffect (mode ==== 3) 실종 정보 수정일 경우
  useEffect(() => {
    if (mode === 2 || mode === 3 || mode === 4) {
      if (userInfo.name !== null) setUserName(userInfo.name);
      if (userInfo.birthDate !== null)
        setBirthday(userInfo.birthDate.toString());
      if (userInfo.missingTime !== null) {
        // type 변경 필요
        // setMissingDate(userInfo.missingTime);
      }
    }
  }, []);

  return (
    <View style={styles.mainContainer}>
      <CustomInputField
        placeholder="이름"
        inputData={text => setUserName(text)}
        value={userName}
        editable={mode === 4 ? false : true}
      />
      <Divider />

      <CustomInputField
        placeholder="생년월일 8자리를 입력해주세요"
        inputData={text => setBirthday(text)}
        maxLength={8}
        keyboardType="number-pad"
        value={birthDay}
        editable={mode === 4 ? false : true}
      />
      <Divider />

      <SelectGender sex={userInfo !== null && userInfo.gender} />
      <Divider />

      {/* 실종 날짜 선택 */}
      {mode === 1 || mode === 3 || mode === 4 ? (
        <>
          <View style={styles.selectDateContainer}>
            <Text style={styles.selectTitle}>실종 날짜</Text>
            <TouchableOpacity
              disabled={mode === 4 && true}
              activeOpacity={0.6}
              onPress={onPressDate}
              style={styles.selectDateBtn}>
              <Text style={styles.selectBtnText}>
                {format(new Date(missingDate), 'PPP', {locale: ko})}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={mode === 4 && true}
              activeOpacity={0.6}
              onPress={onPressTime}
              style={styles.selectDateBtn}>
              <Text style={styles.selectBtnText}>
                {format(new Date(missingDate), 'p aaa', {locale: ko})}
              </Text>
            </TouchableOpacity>
          </View>
          {/* 실종 날짜 선택 모달 */}
          <DateTimePickerModal
            isVisible={visible}
            mode={pickerMode}
            onConfirm={onConfirm}
            onCancel={onCancel}
            date={missingDate}
          />
          <Divider />
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  selectDateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: widthPercentage(8),
    marginVertical: heightPercentage(8),
  },
  selectDateBtn: {
    flexDirection: 'row',
    backgroundColor: '#f0f9ff',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: widthPercentage(16),
    paddingVertical: heightPercentage(8),
    borderRadius: 16,
  },
  selectBtnText: {
    fontSize: fontPercentage(16),
    fontWeight: '700',
    color: '#000000',
  },
  selectTitle: {
    fontSize: fontPercentage(18),
    fontWeight: '600',
    color: '#000000',
  },
});

export default RegistInputForm;
