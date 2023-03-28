/*
  Modify-Screen 등록자가 실종자 정보 수정
  by.정세권
*/

// react
import React, {useState} from 'react';

// react-native
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
} from 'react-native';

// Naver Map Library
import NaverMapView, {Marker} from 'react-native-nmap';

// sizes
import {
  fontPercentage,
  heightPercentage,
  widthPercentage,
} from '../../styles/ResponsiveSize';

// organisms
import ModifyContents from '../organisms/ModifyContents';
import LinkButtons from '../organisms/LinkButtons';

const ModifyScreen = () => {
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

  const [position, setPosition] = useState({
    latitude: 37.564362,
    longitude: 126.977011,
  });

  const onChangeInfo = () => {};

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <View style={styles.detailContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>상세 정보</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image
              source={
                missingPerson.image != null
                  ? null
                  : require('../../assets/images/no_profile_image.png')
              }
              style={styles.image}
            />
          </View>
          <View style={styles.contentContainer}>
            <ModifyContents onChangeInfo={onChangeInfo} />
          </View>
          <View style={styles.linkContainer}>
            <LinkButtons />
          </View>
          <View style={styles.mapContainer}>
            <NaverMapView
              style={{width: '100%', height: '100%'}}
              center={{...position, zoom: 12}}>
              <Marker
                coordinate={position}
                onClick={() => console.warn('onClick! position')}
              />
            </NaverMapView>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  detailContainer: {
    marginTop: heightPercentage(2),
    paddingTop: heightPercentage(24),
    alignItems: 'center',
    backgroundColor: '#ffffff',
    width: widthPercentage(360),
    height: 'auto',
  },
  titleContainer: {
    marginBottom: heightPercentage(12),
  },
  title: {
    fontSize: fontPercentage(18),
    fontWeight: 'bold',
    justifyContent: 'center',
    color: '#000000',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: 20,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
    marginBottom: heightPercentage(24),
  },
  image: {
    width: widthPercentage(150),
    height: heightPercentage(180),
    alignItems: 'center',
    borderRadius: 20,
  },
  contentContainer: {
    marginBottom: heightPercentage(8),
  },
  linkContainer: {
    flexDirection: 'row',
    width: widthPercentage(300),
    marginBottom: heightPercentage(12),
    justifyContent: 'flex-end',
  },
  mapContainer: {
    width: widthPercentage(330),
    height: heightPercentage(330),
    paddingVertical: heightPercentage(24),
  },
});

export default ModifyScreen;
