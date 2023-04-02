import React, {useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  fontPercentage,
  heightPercentage,
  widthPercentage,
} from '../../styles/ResponsiveSize';

import {useFocusEffect} from '@react-navigation/native';

// icons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// recoil
import {useRecoilValue, useRecoilState, useSetRecoilState} from 'recoil';
import {
  registBirth,
  registGender,
  registImageList,
  registMissingDate,
  registMode,
  registName,
  registPos,
} from '../store_regist/registStore';

// position
import Geolocation from 'react-native-geolocation-service';

import ImagePicker from 'react-native-image-crop-picker';
import ImagePickModal from '../organisms/ImagePickModal';
import RegistInputForm from '../organisms/RegistInputForm';
import GoogleMapNotTouch from '../organisms/GoogleMapNotTouch';
import Divider from '../atoms/Divider';

const modeDict = {
  0: '사전 등록',
  1: '실시간 실종자 등록',
  2: '이산가족 등록',
};

const RegistScreen = ({mode = 0, navigation}) => {
  const [imageList, setImageList] = useRecoilState(registImageList);
  const [position, setPosition] = useRecoilState(registPos);
  const setMode = useSetRecoilState(registMode);

  useFocusEffect(
    useCallback(() => {
      setMode(mode);
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          setPosition({lat: latitude, lng: longitude});
          console.log('position change');
        },
        error => {
          console.log(error);
        },
        {enableHighAccuracy: true, timeout: 5000, maximumAge: 5000},
      );
      navigation.addListener('beforeRemove', e => {
        e.preventDefault();
        Alert.alert(
          'Discard changes?',
          'You have unsaved changes. Are you sure to discard them and leave the screen?',
          [
            {text: "Don't leave", style: 'cancel', onPress: () => {}},
            {
              text: 'Discard',
              style: 'destruct',
              // If the user confirmed, then we dispatch the action we blocked earlier
              // This will continue the action that had triggered the removal of the screen
              onPress: () => navigation.dispatch(e.data.action),
            },
          ],
        );
      });
    }, []),
  );

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
        console.log(image);
        setImageList([...imageList, selectImage]);
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImagePickModal />
      <ScrollView style={styles.mainContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{modeDict[mode]}</Text>
        </View>
        <View style={styles.imageListContainer}>
          <FlatList
            data={imageList}
            renderItem={({item}) => (
              <>
                <View style={styles.imageContainer}>
                  <Image source={{uri: item.uri}} style={styles.imageSize} />
                </View>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => {
                    removeImage(item);
                  }}
                  style={styles.closeBtn}>
                  <Icon
                    name="close-circle"
                    size={25}
                    style={styles.closeBtnIcon}
                  />
                </TouchableOpacity>
              </>
            )}
            ListFooterComponent={() => {
              if (imageList.length < 3) {
                return (
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={pickImage}
                    style={styles.addImageBtn}>
                    <Icon name="image-plus" color={'#000000'} size={25} />
                    <Text style={styles.addImageText}>
                      {imageList.length} / 3
                    </Text>
                  </TouchableOpacity>
                );
              } else {
                return null;
              }
            }}
            keyExtractor={item => item.uri}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={styles.registForm}>
          <Divider />
          <RegistInputForm />
          {/* 맵 설정 */}
          {mode !== 0 ? (
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.selectPos}
              onPress={() =>
                navigation.navigate('MapDetail', {
                  lat: position.lat,
                  lng: position.lng,
                  mode: true,
                  getPos: coords => {
                    setPosition(coords);
                  },
                })
              }>
              <View style={styles.selectPosInfoContainer}>
                <Text style={styles.selectTitle}>실종 위치</Text>
                <Text style={styles.selectPosInfo}>{position.lat}</Text>
                <View style={styles.selectPosSubTitle}>
                  <Text style={styles.selectPosInfo}>위치 선택</Text>
                  <Icon
                    name="chevron-right"
                    size={widthPercentage(20)}
                    color={'#667085'}
                  />
                </View>
              </View>
              <View style={styles.mapContainer} pointerEvents="none">
                <GoogleMapNotTouch lat={position.lat} lng={position.lng} />
                <Image
                  source={require('../../assets/images/marker_img.png')}
                  style={styles.mapMarker}
                />
              </View>
            </TouchableOpacity>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#ffffff',
  },
  titleContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: heightPercentage(12),
  },
  title: {
    fontSize: fontPercentage(25),
    fontWeight: 'bold',
    color: '#000000',
  },
  imageListContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {marginHorizontal: widthPercentage(6)},
  imageSize: {
    width: widthPercentage(100),
    height: heightPercentage(100),
    borderRadius: 12,
  },
  closeBtn: {
    position: 'absolute',
    top: heightPercentage(5),
    right: widthPercentage(10),
  },
  closeBtnIcon: {
    backgroundColor: '#ffffff',
    color: '#000000',
    borderRadius: 20,
  },
  addImageBtn: {
    width: widthPercentage(100),
    height: heightPercentage(100),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    elevation: 3,
  },
  addImageText: {
    fontSize: fontPercentage(16),
    fontWeight: 'bold',
    color: '#000000',
  },
  selectTitle: {
    fontSize: fontPercentage(18),
    fontWeight: '600',
    color: '#000000',
  },
  selectPos: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectPosInfoContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: widthPercentage(16),
    marginVertical: heightPercentage(8),
  },
  selectPosSubTitle: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
  },
  selectPosInfo: {
    fontSize: fontPercentage(16),
    fontWeight: '700',
    color: '#667085',
  },
  mapContainer: {
    width: widthPercentage(330),
    height: heightPercentage(230),
    marginVertical: heightPercentage(8),
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
    top: '32%',
    alignSelf: 'center',
  },
});

export default RegistScreen;
