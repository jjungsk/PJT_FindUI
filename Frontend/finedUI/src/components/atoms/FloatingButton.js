import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Modal,
  Pressable,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  fontPercentage,
  heightPercentage,
  widthPercentage,
} from '../../styles/ResponsiveSize';

import ImagePicker from 'react-native-image-crop-picker';
import ImgSelectorContainer from '../organisms/ImgSelectorCotainer';

const styles = StyleSheet.create({
  btnContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1570EF',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  reportMainContainer: {
    marginHorizontal: widthPercentage(20),
    borderRadius: widthPercentage(20),
    paddingHorizontal: widthPercentage(20),
    paddingVertical: heightPercentage(15),
    backgroundColor: 'white',
    alignItems: 'center',
    elevation: 5,
  },
  selectImageContainer: {
    width: widthPercentage(150),
    height: heightPercentage(150),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    elevation: 3,
  },
  selectImageModalContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  imageSize: {
    width: widthPercentage(150),
    height: heightPercentage(150),
    resizeMode: 'contain',
    borderRadius: 12,
  },
  reportBtn: {
    marginTop: heightPercentage(16),
    paddingVertical: heightPercentage(8),
    paddingHorizontal: widthPercentage(40),

    borderColor: '#667085',
    elevation: 2,
    borderRadius: 8,
    borderWidth: 1,
  },
  reportBtnDisable: {
    backgroundColor: '#667085',
  },
  reportBtnEnable: {
    backgroundColor: '#1570EF',
  },
  reportBtnTitle: {
    fontSize: fontPercentage(18),
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

const SelectImageView = () => {
  return (
    <View style={styles.selectImageContainer}>
      <Icon name="image-plus" color={'#000000'} size={25} />
    </View>
  );
};

const FloatingButton = () => {
  const [reportRegistVisible, setReportRegistVisible] = useState(false);
  const [imgSelect, setImgSelect] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const pickImageFromAlbum = async () => {
    setImgSelect(!imgSelect);
    try {
      await ImagePicker.openPicker({
        width: widthPercentage(150),
        height: heightPercentage(150),
        cropping: true,
        mediaType: 'photo',
      }).then(image => {
        const image_name = image.path.substring(
          image.path.lastIndexOf('/') + 1,
        );
        selectImage = {
          uri: image.path,
          name: image_name,
          type: image.mime,
        };
        setImageFile(selectImage);
      });
    } catch (e) {
      console.log(e);
    }
  };

  const pickImageFromCamera = async () => {
    setImgSelect(!imgSelect);
    try {
      await ImagePicker.openCamera({
        width: widthPercentage(150),
        height: heightPercentage(150),
        cropping: true,
        mediaType: 'photo',
      }).then(image => {
        const image_name = image.path.substring(
          image.path.lastIndexOf('/') + 1,
        );
        selectImage = {
          uri: image.path,
          name: image_name,
          type: image.mime,
        };
        setImageFile(selectImage);
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={reportRegistVisible}
        onRequestClose={() => {
          setReportRegistVisible(!reportRegistVisible);
        }}>
        <Pressable
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.4)',
          }}
          onPress={() => setReportRegistVisible(!reportRegistVisible)}
        />
        <View style={styles.selectImageModalContainer}>
          <View style={styles.reportMainContainer}>
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.selectImageBtn}
              onPress={() => {
                setImgSelect(!imgSelect);
              }}>
              {imageFile !== null ? (
                <Image source={{uri: imageFile.uri}} style={styles.imageSize} />
              ) : (
                <SelectImageView />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.6}
              style={[
                styles.reportBtn,
                imageFile === null
                  ? styles.reportBtnDisable
                  : styles.reportBtnEnable,
              ]}
              disabled={imageFile === null ? true : false}
              onPress={() => {}}>
              <Text style={styles.reportBtnTitle}>제보하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={imgSelect}
        onRequestClose={() => {
          setImgSelect(!imgSelect);
        }}>
        <Pressable
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.4)',
          }}
          onPress={() => setImgSelect(!imgSelect)}
        />
        <ImgSelectorContainer
          callback1={pickImageFromCamera}
          callback2={pickImageFromAlbum}
        />
      </Modal>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.button}
          onPress={() => {
            setReportRegistVisible(!reportRegistVisible);
          }}>
          <Icon
            name="alarm-light-outline"
            color={'#ffffff'}
            size={widthPercentage(25)}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default FloatingButton;
