/*
  Kakao Link 버튼 원형 by.정세권
*/

// react
import React from 'react';

// react-native
import {TouchableOpacity, StyleSheet, Image} from 'react-native';

// sizes
import {heightPercentage, widthPercentage} from '../../styles/ResponsiveSize';

const KakaoLink = () => {
  return (
    <TouchableOpacity style={styles.touch}>
      <Image
        source={require('../../assets/kakao.png')}
        style={styles.imageIcon}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff115',
    height: heightPercentage(36),
    width: widthPercentage(36),
    borderRadius: heightPercentage(18),
    marginVertical: heightPercentage(4),
    marginHorizontal: widthPercentage(4),
  },
  imageIcon: {
    height: 20,
    width: 20,
    resizeMode: 'stretch',
  },
});

export default KakaoLink;
