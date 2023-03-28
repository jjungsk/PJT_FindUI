/*
  Modify-Screen의 Contents organisms
  등록자에 의해 실종자 정보 수정
  made by. 정세권
*/

// react
import React, {useState} from 'react';

// react-native
import {View, Text, StyleSheet, TextInput} from 'react-native';

// styles
import {
  fontPercentage,
  heightPercentage,
  widthPercentage,
} from '../../styles/ResponsiveSize';

const ModifyContents = () => {
  const [missingPerson, setMissingPerson] = useState({
    name: '샘스미스',
    birthday: new Date(1997, 2, 18),
    address: '서울시 역삼동 멀티캠퍼스',
    phone: '010-6725-5590',
    lostday: '23. 01. 23. 금요일 13시',
    location: '서울시 역삼역 11번 출구 앞',
    description: '키가 크고 눈이 크며 어쩌구 저쩌구..',
    image: null,
  });

  missingPerson.birthday = missingPerson.birthday.toString();

  const handleData = (key, value) => {
    console.log(key);
    console.log(value);

    setMissingPerson(missingPerson => ({
      ...missingPerson,
      [key]: value,
    }));
  };

  return (
    <View style={styles.table}>
      <View style={styles.row}>
        <View style={styles.left}>
          <View style={{width: widthPercentage(80)}}>
            <Text style={styles.textTitle}>이름</Text>
          </View>
          <View>
            <Text style={styles.textTitle}>:</Text>
          </View>
        </View>
        <View style={styles.right}>
          <TextInput
            style={styles.textContent}
            onChangeText={text => handleData('name', text)}
            value={missingPerson.name}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.left}>
          <View style={{width: widthPercentage(80)}}>
            <Text style={styles.textTitle}>생년월일</Text>
          </View>
          <View>
            <Text style={styles.textTitle}>:</Text>
          </View>
        </View>
        <View style={styles.right}>
          <TextInput
            style={styles.textContent}
            onChangeText={text => handleData('birthday', text)}
            value={missingPerson.birthday}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.left}>
          <View style={{width: widthPercentage(80)}}>
            <Text style={styles.textTitle}>보호자 연락처</Text>
          </View>
          <View>
            <Text style={styles.textTitle}>:</Text>
          </View>
        </View>
        <View style={styles.right}>
          <TextInput
            keyboardType={'number-pad'}
            style={styles.textContent}
            onChangeText={text => handleData('phone', text)}
            value={missingPerson.phone}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.left}>
          <View style={{width: widthPercentage(80)}}>
            <Text style={styles.textTitle}>실종 일자</Text>
          </View>
          <View>
            <Text style={styles.textTitle}>:</Text>
          </View>
        </View>
        <View style={styles.right}>
          <TextInput
            style={styles.textContent}
            onChangeText={text => handleData('lostday', text)}
            value={missingPerson.lostday}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.left}>
          <View style={{width: widthPercentage(80)}}>
            <Text style={styles.textTitle}>실종 장소</Text>
          </View>
          <View>
            <Text style={styles.textTitle}>:</Text>
          </View>
        </View>
        <View style={styles.right}>
          <TextInput
            style={styles.textContent}
            onChangeText={text => handleData('location', text)}
            value={missingPerson.location}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.left}>
          <View style={{width: widthPercentage(80)}}>
            <Text style={styles.textTitle}>특이 사항</Text>
          </View>
          <View>
            <Text style={styles.textTitle}>:</Text>
          </View>
        </View>
        <View style={styles.right}>
          <TextInput
            style={styles.textContent}
            onChangeText={text => handleData('description', text)}
            value={missingPerson.description}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  table: {
    width: widthPercentage(300),
    height: 'auto',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: heightPercentage(12),
  },
  row: {
    width: widthPercentage(280),
    height: heightPercentage(42),
    marginBottom: heightPercentage(8),
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: {
    width: widthPercentage(100),
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  right: {
    width: widthPercentage(180),
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderBottomWidth: widthPercentage(2),
    borderColor: '#1570EF',
  },
  textTitle: {
    fontSize: fontPercentage(12),
    display: 'flex',
    fontWeight: '600',
    color: 'black',
  },
  textContent: {
    fontSize: fontPercentage(12),
    display: 'flex',
    justifyContent: 'flex-start',
    fontWeight: '400',
    color: 'black',
  },
});

export default ModifyContents;
