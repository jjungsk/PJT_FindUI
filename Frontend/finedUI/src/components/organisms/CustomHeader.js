import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {fontPercentage, heightPercentage} from '../../styles/ResponsiveSize';

const CustomHeader = ({title, subTitle, iconCallback}) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>{title}</Text>
      {iconCallback}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    width: '100%',
    height: heightPercentage(60),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: fontPercentage(22),
    fontWeight: '700',
    color: '#000000',
  },
});

export {CustomHeader};
