import React from 'react';

import {View, Button, StyleSheet} from 'react-native';

import {widthPercentage} from '../../styles/ResponsiveSize';

const ModifyButtons = ({actButton}) => {
  return (
    <View style={sytles.container}>
      <View style={sytles.leftContainer}>
        <Button
          style={sytles.button}
          title="취소"
          onPress={() => actButton('cancel')}
        />
      </View>
      <View style={sytles.rightContainer}>
        <Button
          style={sytles.button}
          title="수정"
          onPress={() => actButton('modify')}
        />
      </View>
    </View>
  );
};

const sytles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: widthPercentage(240),
  },
  leftContainer: {
    width: widthPercentage(80),
  },
  rightContainer: {
    width: widthPercentage(80),
  },
  button: {
    borderRadius: widthPercentage(20),
  },
});

export default ModifyButtons;
