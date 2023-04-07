/*
  Detail-Screen Link 버튼들
  KaKao, Instagram, 메시지 버튼 등.. by.정세권
*/

// react
import React from 'react';

// react-native
import {View, StyleSheet} from 'react-native';

// icons
import Icon from 'react-native-vector-icons/AntDesign';

// size
import {heightPercentage, widthPercentage} from '../../styles/ResponsiveSize';

// atoms
import KakaoLink from '../atoms/KakaoLink';
import InstagramLink from '../atoms/InstagramLink';

const LinkButtons = () => {
  return (
    <View style={styles.container}>
      <KakaoLink />
      <InstagramLink />
      <Icon
        name="message1"
        size={widthPercentage(28)}
        style={{
          marginVertical: heightPercentage(4),
          marginHorizontal: widthPercentage(4),
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default LinkButtons;
