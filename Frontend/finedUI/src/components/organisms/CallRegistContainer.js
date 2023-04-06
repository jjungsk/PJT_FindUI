import React, {useState, useEffect} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import {
  fontPercentage,
  widthPercentage,
  heightPercentage,
} from '../../styles/ResponsiveSize';

// position
import Geolocation from 'react-native-geolocation-service';

import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {apiGetAddress} from '../../API/apiKakao';

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    paddingHorizontal: widthPercentage(25),
    paddingVertical: heightPercentage(15),
    backgroundColor: 'white',
  },
  mainContentsContainer: {
    alignItems: 'center',
    elevation: 5,
  },
  titleContainer: {
    marginBottom: heightPercentage(16),
  },
  title: {
    fontSize: fontPercentage(20),
    fontWeight: 'bold',
    color: '#000000',
  },
  selectTitle: {
    fontSize: fontPercentage(16),
    fontWeight: '700',
    color: '#000000',
  },
  selectMapContainer: {
    flex: 1,
    width: '100%',
  },
  addressContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressText: {
    fontSize: fontPercentage(14),
    fontWeight: '600',
    color: '#000000',
  },
  mapContainer: {
    marginVertical: heightPercentage(16),
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D0D5DD',
    overflow: 'hidden',
  },
  containerMap: {
    width: '100%',
    height: '100%',
  },
  btnContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: heightPercentage(8),
    borderWidth: 0.5,
    borderRadius: 8,
    marginTop: heightPercentage(16),
    borderColor: '#F9FAFB',
    elevation: 2,
  },
  btnCancel: {
    marginRight: widthPercentage(4),
    backgroundColor: '#F5FBFF',
  },
  btnConfirm: {
    marginLeft: widthPercentage(4),
    backgroundColor: '#0BA5EC',
  },
  btnText: {
    fontSize: fontPercentage(16),
    fontWeight: '700',
  },
  btnCancelText: {
    color: '#000000',
  },
  btnConfirmText: {
    color: '#ffffff',
  },
  mapMarker: {
    width: widthPercentage(40),
    height: heightPercentage(40),
    resizeMode: 'contain',
    position: 'absolute',
    bottom: '50%',
    alignSelf: 'center',
  },
});

const CallRegistContainer = ({
  cancelCallback = () => {},
  confirmCallback = () => {},
}) => {
  const {width, height} = Dimensions.get('window');
  const LATITUDE_DELTA = 0.005;
  const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);

  const [position, setPosition] = useState(null);
  const [address, setAddress] = useState('');

  useEffect(() => {
    Geolocation.getCurrentPosition(
      async position => {
        const {latitude, longitude} = position.coords;
        setPosition({lat: latitude, lng: longitude});
        await apiGetAddress(longitude, latitude)
          .then(res => setAddress(res.address_name))
          .catch(e => console.log(e));
      },
      error => {
        console.log(error);
      },
      {enableHighAccuracy: true, timeout: 5000, maximumAge: 5000},
    );
  }, []);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>추가 정보 입력</Text>
      </View>
      <View style={styles.selectMapContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.addressText}>{address}</Text>
        </View>
        {position !== null ? (
          <View style={styles.mapContainer}>
            <MapView
              style={styles.containerMap}
              provider={PROVIDER_GOOGLE}
              showsUserLocation={true}
              showsMyLocationButton={true}
              loadingEnabled={true}
              initialRegion={{
                latitude: position.lat,
                longitude: position.lng,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }}
              onRegionChange={async region => {
                const {latitude, longitude} = region;
                setPosition({lat: latitude, lng: longitude});
                await apiGetAddress(longitude, latitude)
                  .then(res => setAddress(res.address_name))
                  .catch(e => console.log(e));
              }}
            />
            <Image
              source={require('../../assets/images/marker_img.png')}
              style={styles.mapMarker}
            />
          </View>
        ) : null}
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={[styles.btn, styles.btnCancel]}
          onPress={() => cancelCallback({value: false})}>
          <Text style={[styles.btnText, styles.btnCancelText]}>취소</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, styles.btnConfirm]}
          onPress={() => confirmCallback({pos: position})}>
          <Text style={[styles.btnText, styles.btnConfirmText]}>확인</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CallRegistContainer;
