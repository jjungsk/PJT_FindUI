/*
  Modify-Screen의 Contents organisms
  등록자에 의해 실종자 정보 수정
  made by. 정세권
*/

// react
import React from 'react';

// react-native
import {View, Text, StyleSheet, TextInput} from 'react-native';

// styles
import {
  fontPercentage,
  heightPercentage,
  widthPercentage,
} from '../../styles/ResponsiveSize';

const ModifyContents = ({missingPerson, onChangeInfo}) => {
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
            onChangeText={text => onChangeInfo('name', text)}
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
            onChangeText={text => onChangeInfo('birthDate', text)}
            value={missingPerson.birthDate}
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
            onChangeText={text => onChangeInfo('phone', text)}
            value={missingPerson.user}
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
            onChangeText={text => onChangeInfo('missingTime', text)}
            value={missingPerson.missingTime}
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
            onChangeText={text => onChangeInfo('missingLocation', text)}
            value={missingPerson.missingLocation}
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
            onChangeText={text => onChangeInfo('description', text)}
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
