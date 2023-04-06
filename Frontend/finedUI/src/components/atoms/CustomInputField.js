import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {TextField} from 'rn-material-ui-textfield';
import {
  fontPercentage,
  heightPercentage,
  widthPercentage,
} from '../../styles/ResponsiveSize';

export default CustomInputField = ({
  placeholder = 'label',
  keyboardType = 'default',
  maxLength = 10,
  multiline = false,
  value = null,
  inputData = text => {
    console.log(text);
  },
}) => {
  return (
    <TextInput
      placeholder={placeholder}
      onChangeText={inputData}
      keyboardType={keyboardType}
      maxLength={maxLength}
      multiline={multiline}
      value={value}
      style={styles.inputTitle}
    />
  );
};

const styles = StyleSheet.create({
  inputTitle: {
    fontSize: fontPercentage(16),
    fontWeight: '700',
    color: '#000000',
    justifyContent: 'center',
    paddingHorizontal: widthPercentage(16),
  },
});
