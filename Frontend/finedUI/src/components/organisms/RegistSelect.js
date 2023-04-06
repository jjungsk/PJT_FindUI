import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  fontPercentage,
  heightPercentage,
  widthPercentage,
} from '../../styles/ResponsiveSize';

const RegistSelectBtn = ({selectItem}) => {
  return (
    <View style={styles.selectContainer}>
      <View style={styles.selectTitle}>
        <Text style={styles.title}>{selectItem.title}</Text>
      </View>
      <View style={styles.selectContent}>
        <Text style={styles.content}>{selectItem.content}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  selectContainer: {
    width: widthPercentage(300),
    height: heightPercentage(140),
    borderRadius: widthPercentage(15),
    // borderWidth: 2,
    padding: 10,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  selectTitle: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: widthPercentage(8),
    paddingVertical: heightPercentage(8),
  },
  selectContent: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: widthPercentage(8),
    paddingVertical: heightPercentage(8),
  },
  title: {
    fontSize: fontPercentage(22),
    fontWeight: 'bold',
    color: '#000000',
  },
  content: {
    fontSize: fontPercentage(15),
    fontWeight: '700',
    // color: '#000000',
  },
});

export default RegistSelectBtn;
