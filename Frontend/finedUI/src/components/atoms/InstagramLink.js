/*
  Instagram Link 버튼 원형 by.정세권
*/

// react
import React from 'react';

// react-native
import {TouchableOpacity, StyleSheet, Image} from 'react-native';

// sizes
import {heightPercentage, widthPercentage} from '../../styles/ResponsiveSize';

const InstagramLink = () => {
  return (
    <TouchableOpacity style={styles.touch}>
      <Image
        source={require('../../assets/instagram.png')}
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
    height: heightPercentage(36),
    width: widthPercentage(36),
    marginVertical: heightPercentage(4),
    marginHorizontal: widthPercentage(4),
  },
  imageIcon: {
    height: heightPercentage(30),
    width: widthPercentage(30),
    resizeMode: 'stretch',
  },
});

export default InstagramLink;
