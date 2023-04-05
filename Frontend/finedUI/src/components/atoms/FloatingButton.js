import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { widthPercentage } from '../../styles/ResponsiveSize';

const styles = StyleSheet.create({
  container: {
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
});

const FloatingButton = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Icon
              name="alarm-light-outline"
              color={'#ffffff'}
              size={widthPercentage(25)}
            />
      </TouchableOpacity>
    </View>
  );
};

export default FloatingButton;