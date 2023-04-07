/*
  Modify-Screen 등록자가 실종자 정보 수정
  by.정세권
*/

// react
import React, {useEffect, useState, Suspense} from 'react';

// react-native
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

// position
import Geolocation from 'react-native-geolocation-service';

// icons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// picker
import ImagePicker from 'react-native-image-crop-picker';

// sizes
import {
  fontPercentage,
  heightPercentage,
  widthPercentage,
} from '../../styles/ResponsiveSize';

// organisms
import ModifyContents from '../organisms/ModifyContents';
import LinkButtons from '../organisms/LinkButtons';
import ModifyButtons from '../organisms/ModifyButtons';
import ImagePickModal from '../organisms/ImagePickModal';
import RegistInputForm from '../organisms/RegistInputForm';
import GoogleMapNotTouch from '../organisms/GoogleMapNotTouch';
import Divider from '../atoms/Divider';
import {apiGetAddress} from '../../API/apiKakao';

// recoil
import {
  useResetRecoilState,
  useRecoilState,
  useSetRecoilState,
  useRecoilValue,
} from 'recoil';
import {
  registAddress,
  registImageList,
  registMode,
  registPos,
  userPosition,
} from '../store_regist/registStore';

// api 호출
import {apiGetMissingPerson} from '../../API/apiMissingPerson.js';

const ModifyScreen = ({navigation, route}) => {
  // STATE
  // Global state - 지도
  const pos = useRecoilValue(registPos);
  const [imageList, setImageList] = useRecoilState(registImageList);
  const [position, setPosition] = useRecoilState(userPosition);

  // Local state - 실종자 정보
  const [missingPerson, setMissingPerson] = useState({});
  const [address, setAddress] = useState('');

  // FUNCTION
  // function - 실종자 정보 수정
  const onChangeInfo = (key, value) => {
    setMissingPerson(missingPerson => ({
      ...missingPerson,
      [key]: value,
    }));
  };

  // function - 수정 버튼
  const actButton = state => {
    if (state === 'cancel') {
      // 취소 버튼
      navigation.navigate('HomeScreen');
    } else if (state === 'modify') {
      // 수정 버튼
      Alert.alert('수정 완료');
      // navigation.navigate('HomeScreen');
    }
  };

  // function
  const removeImage = item => {
    const newImageList = imageList.filter(element => element !== item);
    setImageList(newImageList);
  };

  const pickImage = async () => {
    try {
      await ImagePicker.openPicker({
        width: widthPercentage(150),
        height: heightPercentage(150),
        cropping: true,
        mediaType: 'photo',
      }).then(image => {
        selectImage = {
          uri: image.path,
          width: image.width,
          height: image.height,
          mime: image.mime,
        };
        setImageList([...imageList, selectImage]);
      });
    } catch (e) {
      console.log(e);
    }
  };

  // function - useEffect[pos]
  useEffect(() => {
    const getAddress = () => {
      const auto = async () => {
        const result = await apiGetAddress(pos.lng, pos.lat);

        setAddress(result['address_name']);
      };
      auto();
    };
    if (pos !== null) {
      getAddress();
    }
  }, [pos]);

  // function - useEffect
  useEffect(() => {
    // 위치
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setPosition({lat: latitude, lng: longitude});
        console.log('position change');
        return {lat: latitude, lng: longitude};
      },
      error => {
        console.log(error);
      },
      {enableHighAccuracy: true, timeout: 5000, maximumAge: 5000},
    );

    // route로 넘어온 등록된 ID
    const registId = route.params.registId;
    const auto = async () => {
      await apiGetMissingPerson(registId)
        .then(({data}) => {
          setMissingPerson(data.data);
          console.log(data.data);
        })
        .catch(error => {
          Alert.alert(error.message);
        });
    };
    auto();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <View style={styles.detailContainer}>
          {/* 제목 */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>상세 정보</Text>
          </View>
          {/* 이미지 */}
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
          {/* 실종자 정보 내용 */}
          <View style={styles.contentContainer}>
            <ModifyContents
              missingPerson={missingPerson}
              onChangeInfo={onChangeInfo}
            />
          </View>
          {/* 링크 - 카카오톡, 인스타그램, 채팅 */}
          <View style={styles.linkContainer}>
            <LinkButtons />
          </View>
          {/* 버튼 - 취소, 수정 */}
          <View style={styles.buttonContainer}>
            <ModifyButtons actButton={actButton} />
          </View>
          {/* 지도 */}
          <View style={styles.mapContainer}></View>
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
  buttonContainer: {
    marginBottom: heightPercentage(12),
  },
  mapContainer: {
    width: widthPercentage(330),
    height: heightPercentage(330),
    paddingVertical: heightPercentage(24),
  },
});

export default ModifyScreen;
