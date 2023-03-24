import React from 'react';
import {ImageBackground, View, Text, StyleSheet} from 'react-native';
import {
  fontPercentage,
  heightPercentage,
  widthPercentage,
} from '../../styles/ResponsiveSize';

const MissingPersonCard = ({missingPerson}) => {
  // error
  //   const img =
  //     missingPerson.image !== null
  //       ? require(missingPerson.image)
  //       : require('../../assets/images/no_profile_image.png');
  const img = require('../../assets/images/no_profile_image.png');
  return (
    <ImageBackground source={img} resizeMode="cover" style={styles.image}>
      <View style={styles.imageText}>
        <Text style={styles.imageTextName}>{missingPerson.name}</Text>
        <Text style={styles.imageTextContents}>
          {missingPerson.identity} / {missingPerson.location}
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    width: widthPercentage(150),
    height: heightPercentage(180),
  },
  imageText: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  imageTextName: {
    width: '100%',
    fontSize: fontPercentage(14),
  },
  imageTextContents: {
    width: '100%',
    fontSize: fontPercentage(12),
  },
});

export {MissingPersonCard};
