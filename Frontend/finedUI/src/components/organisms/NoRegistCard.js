// react
import React from 'react';

// react-native
import {View, Text, StyleSheet} from 'react-native';

// styles
import {
  fontPercentage,
  heightPercentage,
  widthPercentage,
} from '../../styles/ResponsiveSize';

const NoRegistCard = ({textInfo}) => {
  return (
    <View style={styles.container}>
      <View style={styles.contents}>
        <Text style={styles.text}>{textInfo}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 20,
    padding: widthPercentage(12),
    borderStyle: 'solid',
    backgroundColor: '#ffffff',
  },
  contents: {
    flex: 2,
    height: heightPercentage(132),
    justifyContent: 'center'
  },
  text: {
    alignSelf: 'center',
    fontSize: fontPercentage(18),
    fontWeight: '600',
    color: 'black',
    height: heightPercentage(60),
    // paddingLeft: widthPercentage(12),
  },
});

export default NoRegistCard;
