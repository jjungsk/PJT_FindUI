// react
import React from 'react';

// react-native
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

// recoil
import {useSetRecoilState} from 'recoil';
import {resetRegistAtoms} from '../store_regist/registStore';

// styles
import {
  fontPercentage,
  heightPercentage,
  widthPercentage,
} from '../../styles/ResponsiveSize';

// icons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PreRegistCard = ({registUser, userInfo, navigation}) => {
  // recoil data 초기화
  const resetRegistProps = useSetRecoilState(resetRegistAtoms);
  return (
    <View style={styles.container}>
      <Image
        source={
          registUser.frontImagePath != null
            ? null
            : require('../../assets/images/no_profile_image.png')
        }
        style={styles.image}
      />
      <View style={styles.contents}>
        <View style={styles.icons}>
          <TouchableOpacity
            onPress={() => {
              resetRegistProps((mode = 3));
              navigation.navigate('registMain', {
                userInfo: registUser,
              });
              // navigation.navigate('ModifyScreen', {
              //   registId: registUser.registId,
              //   userInfo: userInfo,
              // });
            }}>
            <Icon
              name="square-edit-outline"
              size={20}
              style={{width: 20, height: 20}}
            />
          </TouchableOpacity>
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
            생년 월일 : {registUser.birthDate}
          </Text>
          <Text numberOfLines={1} style={styles.text}>
            보호자 주소 : {userInfo.address}
          </Text>
          <Text numberOfLines={1} style={styles.text}>
            보호자 연락처 : {userInfo.phoneNumber}
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
    padding: widthPercentage(12),
    borderStyle: 'solid',
    borderWidth: 1,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
  },
  image: {
    flex: 1,
    width: widthPercentage(110),
    height: heightPercentage(132),
    borderRadius: 20,
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

export default PreRegistCard;
