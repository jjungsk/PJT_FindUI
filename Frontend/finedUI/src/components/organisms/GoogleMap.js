/*
  Google Map 사용 github 주소
  https://github.com/react-native-maps/react-native-maps

  by.정세권
*/

// react
import React, {useState} from 'react';

// react-native
import {View, StyleSheet} from 'react-native';

// google map
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

const GoogleMap = ({latitude, longitude}) => {
  const [location, setLocation] = useState({
    latitude: latitude,
    longitude: longitude,
  });

  return (
    <MapView
      style={styles.containerMap}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      onRegionChange={region => {
        setLocation({
          latitude: region.latitude,
          longitude: region.longitude,
        });
      }}></MapView>
  );
};

const styles = StyleSheet.create({
  containerMap: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GoogleMap;
