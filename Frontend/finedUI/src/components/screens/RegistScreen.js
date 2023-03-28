import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  Modal,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {
  fontPercentage,
  heightPercentage,
  widthPercentage,
} from '../../styles/ResponsiveSize';

import WrappedText from 'react-native-wrapped-text';
import Divider from '../atoms/Divider';

const modeDict = {
  0: '사전 등록',
  1: '실시간 실종자 등록',
  2: '이산가족 등록',
};

const RegistScreen = ({mode = 0}) => {
  const [modalVisible, setModalVisible] = useState(true);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <Pressable
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.4)',
          }}
          onPress={() => setModalVisible(!modalVisible)}
        />
        <View style={styles.modalContainer}>
          <View style={styles.modalMainContents}>
            <View style={styles.modalTitleContainer}>
              <Text style={styles.modalTitle}>이미지 등록 방법</Text>
            </View>
            <View style={styles.modalContentsContainer}>
              <View style={styles.contentImageContainer}>
                <Image
                  source={require('../../assets/images/no_profile_image.png')}
                  resizeMode="contain"
                  style={styles.contentImage}
                />
                <Image
                  source={require('../../assets/images/no_profile_image.png')}
                  resizeMode="contain"
                  style={styles.contentImage}
                />
              </View>
              <Divider />
              <View style={styles.contentTextContainer}>
                <WrappedText
                  rowWrapperStyle={{
                    justifyContent: 'center',
                    paddingBottom: 15,
                  }}
                  textStyle={styles.contentText}>
                  다음과 같이 인물의 정면 사진이 정확도를 높힙니다.
                </WrappedText>
                <WrappedText
                  rowWrapperStyle={{justifyContent: 'center'}}
                  textStyle={styles.contentText}>
                  만약 정면 사진이 없다면 최대 5장 이내 가장 최근 사진을 업로드
                  해주세요.
                </WrappedText>
              </View>
            </View>
            <Pressable
              style={styles.modalCloseBtn}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={{...styles.contentText, color: '#ffffff'}}>
                닫기
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  modalMainContents: {
    marginHorizontal: widthPercentage(20),
    borderRadius: widthPercentage(20),
    paddingHorizontal: widthPercentage(25),
    paddingVertical: heightPercentage(15),
    backgroundColor: 'white',
    alignItems: 'center',
    elevation: 5,
  },
  modalTitleContainer: {
    marginBottom: heightPercentage(10),
  },
  modalTitle: {
    fontSize: fontPercentage(20),
    fontWeight: 'bold',
    color: '#000000',
  },
  modalContentsContainer: {
    width: '100%',
  },
  contentImageContainer: {
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  contentImage: {
    width: widthPercentage(120),
    height: heightPercentage(150),
    borderRadius: 20,
    marginHorizontal: widthPercentage(5),
  },
  contentTextContainer: {
    marginVertical: heightPercentage(15),
    alignItems: 'center',
  },
  contentText: {
    fontSize: fontPercentage(16),
    fontWeight: 'bold',
    color: '#000000',
  },
  modalCloseBtn: {
    paddingHorizontal: widthPercentage(20),
    paddingVertical: heightPercentage(10),
    backgroundColor: '#2196F3',
    borderRadius: 20,
  },
});

export default RegistScreen;
