import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {
  fontPercentage,
  heightPercentage,
  widthPercentage,
} from '../../styles/ResponsiveSize';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MyInfoCard = ({myInfo, onPress, navigation}) => {

  return (
    <View style={styles.container}>
      <View style={styles.contents}>
        <View style={styles.icons}>
          <TouchableOpacity
            onPress={onPress}>
            <Icon
              name="square-edit-outline"
              size={20}
              style={{width: 20, height: 20}}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.info}>
          <Text numberOfLines={1} style={styles.text}>
            이름 : {myInfo.name}
          </Text>
          <Text numberOfLines={1} style={styles.text}>
            주소 : {myInfo.address}
          </Text>
          <Text numberOfLines={1} style={styles.text}>
            이메일 : {myInfo.email}
          </Text>
          <Text numberOfLines={1} style={styles.text}>
            전화번호 : {myInfo.phone}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // width: '90%',
    // height: '30%',
    borderRadius: 20,
    padding: widthPercentage(12),
    borderStyle: 'solid',
    borderWidth: 1,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
  },
  
  contents: {
    flex: 2,
    height: heightPercentage(132),
    alignContent: 'space-between',
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  info: {
    width: '100%',
    height: heightPercentage(112),
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingBottom: heightPercentage(13),
  },
  text: {
    fontSize: fontPercentage(16),
    fontWeight: '600',
    color: 'black',
    height: heightPercentage(20),
    paddingLeft: widthPercentage(12),
  },
});

export default MyInfoCard;
