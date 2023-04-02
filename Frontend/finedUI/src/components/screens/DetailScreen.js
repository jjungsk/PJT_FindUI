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
} from 'react-native';

// sizes
import {
  fontPercentage,
  heightPercentage,
  widthPercentage,
} from '../../styles/ResponsiveSize';

// organisms
import DetailContents from '../organisms/DetailContents';
import LinkButtons from '../organisms/LinkButtons';
import GoogleMap from '../organisms/GoogleMap';

// apis
import {apiGetMissingPerson} from '../../API/apiMissingPerson';

const DetailScreen = ({route}) => {
  // STATE
  // state - 실종자 정보
  const [missingPerson, setMissingPerson] = useState({});

  const [position, setPosition] = useState({
    latitude: 37.564362,
    longitude: 126.977011,
  });

  // FUNCTION
  // useEffect
  useEffect(() => {
    // route로 넘어온 등록된 ID
    const registId = route.params.registId;

    const auto = async () => {
      await apiGetMissingPerson(registId)
        .then(({data}) => {
          setMissingPerson(data.data);
          console.log(data.data);
        })
        .catch(error => {
          Alert.alert(error);
        });
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
                missingPerson.image != null
                  ? null
                  : require('../../assets/images/no_profile_image.png')
              }
              style={styles.image}
            />
          </View>
          <View style={styles.contentContainer}>
            <DetailContents missingPerson={missingPerson} />
          </View>
          <View style={styles.linkContainer}>
            <LinkButtons />
          </View>
          <View style={styles.mapContainer}>
            <GoogleMap
              latitude={position.latitude}
              longitude={position.longitude}
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
  mapContainer: {
    width: widthPercentage(330),
    height: heightPercentage(330),
    paddingVertical: heightPercentage(24),
  },
});

export default DetailScreen;
