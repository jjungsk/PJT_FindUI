/*
  Google Map 사용 github 주소
  https://github.com/react-native-maps/react-native-maps

  by.정세권
*/

// react
import React, {useState, useEffect} from 'react';

// react-native
import {View, Image, StyleSheet, Dimensions} from 'react-native';

import {widthPercentage, heightPercentage} from '../../styles/ResponsiveSize';

// google map
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

// position
import Geolocation from 'react-native-geolocation-service';

const GoogleMapDetail = ({
  pos,
  zoom = 0.005,
  setMarker = false,
  getPosition = null,
}) => {
  const {width, height} = Dimensions.get('window');
  const LATITUDE_DELTA = zoom;
  const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);

  return (
    <MapView
      style={styles.containerMap}
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}
      showsMyLocationButton={true}
      initialRegion={{
        latitude: pos.lat,
        longitude: pos.lng,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }}
      onRegionChangeComplete={region => {
        const {latitude, longitude} = region;
        getPosition({lat: latitude, lng: longitude});
      }}>
      {setMarker ? (
        <Marker coordinate={{latitude: pos.lat, longitude: pos.lng}}>
          <Image
            source={require('../../assets/images/marker_img.png')}
            style={styles.mapMarker}
          />
        </Marker>
      ) : null}
    </MapView>
  );
};

const styles = StyleSheet.create({
  containerMap: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapMarker: {
    width: widthPercentage(40),
    height: heightPercentage(40),
    resizeMode: 'contain',
  },
});

export default GoogleMapDetail;
