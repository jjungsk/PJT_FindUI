import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {
  fontPercentage,
  heightPercentage,
  widthPercentage,
} from '../../styles/ResponsiveSize';

// icons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {format} from 'date-fns';
import ko from 'date-fns/esm/locale/ko/index.js';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CustomInputField from '../atoms/CustomInputField';

const RegistInputForm = ({mode = 0, setUser}) => {
  const [userName, setUserName] = useState();
  const [birthday, setBirthday] = useState();
  const [missingDate, setMissingDate] = useState(new Date());
  const [pickerMode, setPickerMode] = useState('date');
  const [visible, setVisible] = useState(false);

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

  return (
    <View>
      <CustomInputField label="이름" inputData={text => setUserName(text)} />
      <CustomInputField
        label="생년월일"
        title="생년월일 6자리 입력해주세요"
        inputData={text => setBirthday(text)}
      />
      <View style={styles.selectDateContainer}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={onPressDate}
          style={styles.selectDateBtn}>
          <Text style={styles.selectBtnText}>
            {format(new Date(missingDate), 'PPP', {locale: ko})}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={onPressTime}
          style={styles.selectDateBtn}>
          <Text style={styles.selectBtnText}>
            {format(new Date(missingDate), 'p aaa', {locale: ko})}
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginHorizontal: widthPercentage(16),
          paddingTop: heightPercentage(10),
          borderBottomColor: 'rgba(0, 0, 0, .38)',
          borderBottomWidth: 2,
        }}
      />
      <DateTimePickerModal
        isVisible={visible}
        mode={pickerMode}
        onConfirm={onConfirm}
        onCancel={onCancel}
        date={missingDate}
      />
      <TouchableOpacity activeOpacity={0.6} style={styles.selectLocate}>
        <Text style={styles.selectLocateTitle}>실종 위치</Text>
        <View style={styles.selectLocateInfoContainer}>
          <Text style={styles.selectLocateInfo}>위치 선택</Text>
          <Icon
            name="chevron-right"
            size={widthPercentage(20)}
            color={'#667085'}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  selectDateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: widthPercentage(16),
    marginVertical: heightPercentage(4),
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
  selectLocate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: widthPercentage(16),
    marginVertical: heightPercentage(8),
  },
  selectLocateTitle: {
    fontSize: fontPercentage(20),
    fontWeight: '600',
    color: '#000000',
  },
  selectLocateInfoContainer: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
  },
  selectLocateInfo: {
    fontsize: fontPercentage(18),
    fontWeight: '700',
    color: '#667085',
  },
});

export default RegistInputForm;
