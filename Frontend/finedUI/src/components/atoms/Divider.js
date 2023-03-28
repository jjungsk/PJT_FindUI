import React from 'react';
import {View, StyleSheet} from 'react-native';

const Divider = ({direction = 'row'}) => {
  return (
    <View style={true ? styles.dirRow : styles.dirCol}>
      <View
        style={(styles.borderStyle, true ? styles.lineRow : styles.lineCol)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dirRow: {
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  dirCol: {
    height: '100%',
    alignItems: 'center',
    flexDirection: 'column',
  },
  borderStyle: {
    borderWidth: 0.5,
    borderColor: '#575757',
  },
  lineRow: {
    margin: 10,
    height: 1,
    width: '90%',
  },
  lineCol: {
    margin: 10,
    width: 1,
    height: '90%',
  },
});

export default Divider;
