import React from 'react';

import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

import {Dimensions, StyleSheet} from 'react-native';

const GoogleMapNotTouch = ({lat = 0, lng = 0, zoom = 0.005}) => {
  const {width, height} = Dimensions.get('window');
  const LATITUDE_DELTA = zoom;
  const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);
  //   console.log(width, height);

  return (
    <MapView
      style={styles.containerMap}
      provider={PROVIDER_GOOGLE}
      region={{
        latitude: lat,
        longitude: lng,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }}></MapView>
  );
};

const styles = StyleSheet.create({
  containerMap: {
    width: '100%',
    height: '100%',
  },
});

export default GoogleMapNotTouch;
