// react
import React from 'react';

// react-native
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// sizes
import {
  fontPercentage,
  heightPercentage,
  widthPercentage,
} from '../../styles/ResponsiveSize';

// recoil
import {useSetRecoilState} from 'recoil';
import {resetRegistAtoms} from '../store_regist/registStore';

const MissingPersonCard = ({missingPerson, navigation}) => {
  // recoil data 초기화
  const resetRegistProps = useSetRecoilState(resetRegistAtoms);

  // default 이미지
  const img = require('../../assets/images/no_profile_image.png');
  return (
    <TouchableOpacity
      onPress={() => {
        resetRegistProps((mode = 4));
        navigation.navigate('registMain', {userInfo: missingPerson});
      }}>
      <ImageBackground
        source={{
          uri:
            missingPerson.frontImagePath !== null
              ? missingPerson.frontImagePath
              : img,
        }}
        resizeMode="cover"
        style={styles.image}
        imageStyle={styles.imageStyle}>
        <LinearGradient
          style={styles.imageText}
          colors={[
            'rgba(0,0,0,0)',
            'rgba(0,0,0,0)',
            'rgba(0,0,0,0)',
            '#000000',
          ]}>
          <View>
            <Text style={styles.imageTextName}>{missingPerson.name}</Text>
          </View>
          <View>
            <Text style={styles.imageTextContents}>
              {missingPerson.birthDate !== null && missingPerson.birthDate}
            </Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    width: widthPercentage(150),
    height: heightPercentage(180),
  },
  imageStyle: {
    borderRadius: widthPercentage(20),
  },
  imageText: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: widthPercentage(8),
    paddingVertical: heightPercentage(8),
    borderRadius: widthPercentage(20),
  },
  imageTextName: {
    width: '100%',
    fontSize: fontPercentage(14),
    fontWeight: 'bold',
    color: '#ffffff',
  },
  imageTextContents: {
    width: '100%',
    fontSize: fontPercentage(12),
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export {MissingPersonCard};
