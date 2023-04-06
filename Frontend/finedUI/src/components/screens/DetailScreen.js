/*
  Detail-Screen 실종자 정보 상세 정보 보기
  made by. 정세권
*/

// react
import React, {useState, useEffect} from 'react';

// react-native
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
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
import GoogleMapNotTouch from '../organisms/GoogleMapNotTouch';
import LinkButtons from '../organisms/LinkButtons';

// apis
import {apiGetAddress} from '../../API/apiKakao';

const DetailScreen = ({navigation, route}) => {
  // State - 실종자 정보
  const [missingPerson, setMissingPerson] = useState({});
  const [address, setAddress] = useState();

  // FUNCTION
  // useEffect
  useEffect(() => {
    // route로 넘어온 등록된 ID
    setMissingPerson(route.params.missingPerson);

    // 위도 경도를 통한 주소 가져오기
    const auto = async () => {
      await apiGetAddress(
        route.params.missingPerson.longitude,
        route.params.missingPerson.latitude,
      )
        .then(res => {
          setAddress(res.address_name);
        })
        .catch(error => console.log(error));
    };
    auto();
  }, []);

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
                missingPerson.frontImagePath != null
                  ? null
                  : require('../../assets/images/no_profile_image.png')
              }
              style={styles.image}
            />
          </View>
          <View style={styles.contentContainer}>
            <DetailContents detail={missingPerson} address={address} />
          </View>
          <View style={styles.linkContainer}>
            <LinkButtons />
          </View>
          <TouchableOpacity
            style={styles.mapDetail}
            onPress={() =>
              navigation.navigate('MapDetail', {
                lat: missingPerson.latitude,
                lng: missingPerson.longitude,
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
              lat={missingPerson.latitude}
              lng={missingPerson.longitude}
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
