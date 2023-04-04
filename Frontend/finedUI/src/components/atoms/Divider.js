import React from 'react';
import {View} from 'react-native';

import {widthPercentage, heightPercentage} from '../../styles/ResponsiveSize';

const Divider = () => {
  return (
    <View
      style={{
        marginHorizontal: widthPercentage(16),
        marginVertical: heightPercentage(8),
        borderBottomColor: 'rgba(0, 0, 0, .38)',
        borderBottomWidth: 0.5,
      }}
    />
  );
};

export default Divider;
