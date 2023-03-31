import React from 'react';
import {StyleSheet} from 'react-native';
import {TextField} from 'rn-material-ui-textfield';
import {
  fontPercentage,
  heightPercentage,
  widthPercentage,
} from '../../styles/ResponsiveSize';

export default CustomInputField = ({
  label = 'label',
  labelColor = 'rgba(0, 0, 0, .38)',
  inputData = text => {
    console.log(text);
  },
  title = '',
}) => {
  return (
    <TextField
      textColor="rgba(0, 0, 0, 1)"
      label={label}
      baseColor={labelColor}
      labelFontSize={fontPercentage(16)}
      fontSize={fontPercentage(20)}
      title={title}
      activeLineWidth={2}
      lineWidth={2}
      labelOffset={{y1: -5}}
      labelTextStyle={styles.inputLabel}
      titleTextStyle={styles.inputTitle}
      containerStyle={styles.inputFieldContainer}
      onChangeText={inputData}
    />
  );
};

const styles = StyleSheet.create({
  inputFieldContainer: {
    paddingHorizontal: widthPercentage(16),
    marginTop: heightPercentage(-16),
    justifyContent: 'center',
  },
  inputLabel: {
    lineHeight: heightPercentage(26),
    fontWeight: '700',
  },
  inputTitle: {
    fontWeight: '700',
    textAlign: 'right',
  },
});
