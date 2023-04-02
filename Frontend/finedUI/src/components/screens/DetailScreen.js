/*
  Detail-Screen 실종자 정보 상세 정보 보기
  made by. 정세권
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
  TouchableOpacity,
} from 'react-native';

// sizes
import {
  fontPercentage,
  heightPercentage,
  widthPercentage,
} from '../../styles/ResponsiveSize';

// icons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// organisms
import DetailContents from '../organisms/DetailContents';
import GoogleMapDetail from '../organisms/GoogleMapDetail';
import GoogleMapNotTouch from '../organisms/GoogleMapNotTouch';
import LinkButtons from '../organisms/LinkButtons';

const DetailScreen = ({navigation}) => {
  const [detailUser, setDetailUser] = useState({
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
                detailUser.image != null
                  ? null
                  : require('../../assets/images/no_profile_image.png')
              }
              style={styles.image}
            />
          </View>
          <View style={styles.contentContainer}>
            <DetailContents detail={detailUser} />
          </View>
          <View style={styles.linkContainer}>
            <LinkButtons />
          </View>
          <TouchableOpacity
            style={styles.mapDetail}
            onPress={() =>
              navigation.navigate('MapDetail', {
                lat: position.latitude,
                lng: position.longitude,
                mode: false,
              })
            }>
            <View style={styles.mapDetailTitleContainer}>
              <Text style={styles.mapDetailTitle}>실종위치</Text>
              <Icon
                name="chevron-right"
                size={widthPercentage(20)}
                color={'#667085'}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.mapContainer} pointerEvents="none">
            <GoogleMapNotTouch
              lat={position.latitude}
              lng={position.longitude}
            />
            <Image
              source={require('../../assets/images/marker_img.png')}
              style={styles.mapMarker}
            />
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
  mapDetail: {
    width: '100%',
  },
  mapDetailTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: widthPercentage(16),
    marginVertical: heightPercentage(8),
  },
  mapDetailTitle: {
    fontSize: fontPercentage(16),
    fontWeight: '600',
    color: '#000000',
  },
  mapContainer: {
    width: widthPercentage(330),
    height: heightPercentage(230),
    marginBottom: heightPercentage(12),
    borderWidth: 1.5,
    borderRadius: 20,
    borderColor: '#D0D5DD',
    overflow: 'hidden',
  },
  mapMarker: {
    width: widthPercentage(40),
    height: heightPercentage(40),
    resizeMode: 'contain',
    position: 'absolute',
    top: '40%',
    alignSelf: 'center',
  },
});

export default DetailScreen;
