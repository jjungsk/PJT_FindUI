/*
  Google Map 사용 github 주소
  https://github.com/react-native-maps/react-native-maps

  by.정세권
*/

// react
import React, {useState} from 'react';

// react-native
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';

// google map
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {heightPercentage, widthPercentage} from '../../styles/ResponsiveSize';

const GoogleMap = ({latitude, longitude}) => {
  const [location, setLocation] = useState({
    latitude: latitude,
    longitude: longitude,
  });

  return (
    <View style={styles.container}>
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
        }}
      />
      <TouchableOpacity style={styles.overlay}>
        <Text style={styles.text}>Touchable Opacity</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  containerMap: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    left: '35%',
    bottom: '45%',
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  text: {
    color: 'black',
  },
});

export default GoogleMap;
