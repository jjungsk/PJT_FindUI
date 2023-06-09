/*
  Detail-Screen의 Contents organisms
  made by. 정세권
*/

// react
import React from 'react';

// react-native
import {View, Text, StyleSheet} from 'react-native';

// styles
import {
  fontPercentage,
  heightPercentage,
  widthPercentage,
} from '../../styles/ResponsiveSize';

import {format} from 'date-fns';
import ko from 'date-fns/esm/locale/ko/index.js';

const DetailContents = ({detail, address}) => {
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
          <Text style={styles.textContent}>{detail.name}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.left}>
          <View style={{width: widthPercentage(80)}}>
            <Text style={styles.textTitle} numberOfLines={2}>
              생년월일
            </Text>
          </View>
          <View>
            <Text style={styles.textTitle}>:</Text>
          </View>
        </View>
        <View style={styles.right}>
          <Text style={styles.textContent}>{detail.birthDate}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.left}>
          <View style={{width: widthPercentage(80)}}>
            <Text style={styles.textTitle}>성별</Text>
          </View>
          <View>
            <Text style={styles.textTitle}>:</Text>
          </View>
        </View>
        <View style={styles.right}>
          <Text style={styles.textContent}>
            {detail.gender === 1 ? '남성' : '여성'}
          </Text>
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
          <Text style={styles.textContent}>
            {/* {format(detail.missingTime, 'PPP aaa', {locale: ko})} */}
            {detail.missingTime}
          </Text>
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
          <Text style={styles.textContent}>{address}</Text>
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
          <Text style={styles.textContent} numberOfLines={5}>
            {detail.description}
          </Text>
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
  },
  row: {
    width: widthPercentage(280),
    marginBottom: heightPercentage(8),
    flexDirection: 'row',
    alignItems: 'flex-start',
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
    fontWeight: '400',
    color: 'black',
  },
});

export default DetailContents;
