import React from 'react';
import {View, Text, Image, Dimensions, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const setTwoWord = word => {
  return word.length == 1 ? '0' + word : word;
};

const dateFormat = date => {
  let year = String(date.getFullYear());
  let month = String(date.getMonth() + 1);
  let day = String(date.getDate());
  year = year.substring(2, 4);
  month = setTwoWord(month);
  day = setTwoWord(day);

  return year + '.' + month + '.' + day;
};

const PreRegistCard = ({registUser}) => {
  registUser.birthday = dateFormat(registUser.birthday);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/no_profile_image.png')}
        style={styles.image}
      />
      <View style={styles.contents}>
        <View style={styles.icons}>
          <Icon
            name="square-edit-outline"
            size={20}
            style={{width: 20, height: 20}}
          />
          <Icon
            name="share-outline"
            size={20}
            style={{width: 20, height: 20}}
          />
        </View>
        <View style={styles.info}>
          <Text numberOfLines={1} style={styles.text}>
            이름 : {registUser.name}
          </Text>
          <Text numberOfLines={1} style={styles.text}>
            생년 월일 : {registUser.birthday}
          </Text>
          <Text numberOfLines={1} style={styles.text}>
            보호자 주소 : {registUser.address}
          </Text>
          <Text numberOfLines={1} style={styles.text}>
            보호자 연락처 : {registUser.phone}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // height: '30%',
    borderRadius: 20,
    padding: 12,
    borderStyle: 'solid',
    borderWidth: 1,
    flexDirection: 'row',
  },
  image: {flex: 1, width: 110, height: 132, borderRadius: 20},
  contents: {
    flex: 2,
    height: 132,
    alignContent: 'space-between',
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  info: {
    width: '100%',
    height: 112,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingBottom: 13,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
    height: 20,
    paddingLeft: 12,
  },
});

export default PreRegistCard;
