import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {fontPercentage, widthPercentage} from '../../styles/ResponsiveSize';

const NoticeCard = ({notice}) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{notice.title}</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text numberOfLines={3} elip style={styles.content}>
          {notice.content}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: widthPercentage(12),
    // borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#ffffff'
  },
  titleContainer: {
    width: '100%',
    padding: widthPercentage(8),
  },
  title: {
    fontSize: fontPercentage(18),
    fontWeight: 'bold',
  },
  contentContainer: {
    width: '100%',
    padding: widthPercentage(8),
  },
  content: {
    fontSize: fontPercentage(14),
  },
});

export {NoticeCard};
