import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

import {
  widthPercentage,
  heightPercentage,
  fontPercentage,
} from '../../styles/ResponsiveSize';

import GoogleMapDetail from '../organisms/GoogleMapDetail';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {userPosition} from '../store_regist/homeStore';
import {registPos} from '../store_regist/registStore';

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
  },
  mapMarker: {
    width: widthPercentage(40),
    height: heightPercentage(40),
    resizeMode: 'contain',
    position: 'absolute',
    bottom: heightPercentage(335),
    alignSelf: 'center',
  },
  setPosBtn: {
    width: '90%',
    height: heightPercentage(50),
    position: 'absolute',
    bottom: heightPercentage(32),
    borderRadius: 15,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3ca6ef',
  },
  setPosBtnTitle: {
    fontSize: fontPercentage(18),
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

const MapViewDetail = ({navigation, route}) => {
  let position = useRecoilValue(userPosition);
  const [pos, setPos] = useRecoilState(registPos);

  const registMode = route.params.mode ? true : false;
  if (!registMode) {
    position = {lat: route.params.lat, lng: route.params.lng};
  }
  return (
    <View style={styles.mainContainer}>
      <View style={styles.infoContainer}></View>
      <GoogleMapDetail position={position} setMarker={!registMode} />
      {registMode ? (
        <>
          <Image
            source={require('../../assets/images/marker_img.png')}
            style={styles.mapMarker}
          />
          <TouchableOpacity
            style={styles.setPosBtn}
            onPress={() => {
              setPos(position);
              if (pos !== null) {
                navigation.goBack();
              }
            }}>
            <Text style={styles.setPosBtnTitle}>선택 완료</Text>
          </TouchableOpacity>
        </>
      ) : null}
    </View>
  );
};

export default MapViewDetail;
