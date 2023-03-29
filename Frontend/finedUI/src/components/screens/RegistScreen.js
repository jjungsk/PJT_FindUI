import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  Modal,
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  fontPercentage,
  heightPercentage,
  widthPercentage,
} from '../../styles/ResponsiveSize';

// icons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Carousel} from 'react-native-basic-carousel';
import ImagePicker from 'react-native-image-crop-picker';
import ImagePickModal from '../organisms/ImagePickModal';

const modeDict = {
  0: '사전 등록',
  1: '실시간 실종자 등록',
  2: '이산가족 등록',
};

const ImageAdd = ({imagePick, size = 25}) => {
  return (
    <Pressable onPress={imagePick} style={styles.imageAddBtn}>
      <Icon name="image-plus" color={'#ffffff'} size={size} />
      <Text style={styles.addImageText}>사진 추가</Text>
    </Pressable>
  );
};

const RegistScreen = ({mode = 0}) => {
  const imageWidth = widthPercentage(150);
  const [imageList, setImageList] = useState([]);

  const pickImage = async () => {
    try {
      const selectImage = await ImagePicker.openPicker({
        width: widthPercentage(150),
        height: heightPercentage(150),
        cropping: true,
        mediaType: 'photo',
      }).then(image => {
        image = {
          uri: image.path,
          width: image.width,
          height: image.height,
          mime: image.mime,
        };
        console.log(image);
        setImageList([...imageList, image]);
      });
      // console.log(selectImage);
      // setImageList([...imageList, selectImage]);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView>
      <ImagePickModal />
      <ScrollView style={styles.mainContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{modeDict[mode]}</Text>
        </View>
        <View style={styles.imageListContainer}>
          {imageList.length < 1 ? (
            <View style={styles.imageAddTextContainer}>
              <Text style={styles.imageAddText}>사진을{'\n'}추가해주세요</Text>
            </View>
          ) : (
            <Carousel
              data={imageList}
              itemWidth={imageWidth}
              renderItem={({item}) => {
                <View style={{width: 150, height: 150, borderWidth: 1}}>
                  <Image source={{url: item.uri}} style={styles.imageSize} />
                </View>;
              }}
              pagination
            />
          )}
          {imageList.length < 3 ? <ImageAdd imagePick={pickImage} /> : null}
        </View>
        <View style={styles.registForm}></View>
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
  imageSize: {
    width: 150,
    height: 150,
  },
  imageAddTextContainer: {
    width: widthPercentage(150),
    height: heightPercentage(150),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    elevation: 3,
  },
  imageAddText: {
    fontSize: fontPercentage(20),
    fontWeight: 'bold',
    color: '#000000',
  },
  imageAddBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#3ca6ef',
    paddingHorizontal: widthPercentage(16),
    paddingVertical: heightPercentage(8),
    borderRadius: 20,
    marginVertical: heightPercentage(16),
  },
  addImageText: {
    fontSize: fontPercentage(16),
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default RegistScreen;
