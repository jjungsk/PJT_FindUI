import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

const styles = StyleSheet.create({
  checkBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  uncheckedBox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 10,
  },
  checkedBox: {
    width: 20,
    height: 20,
    backgroundColor: '#000',
    marginRight: 10,
  },
  label: {
    fontSize: 16,
  },
});

const CheckBox = () => {
  const [isChecked, setIsChecked] = useState(false);

  const onPress = () => {
    setIsChecked(!isChecked);
  };

  return (
    <TouchableOpacity style={styles.checkBox} onPress={onPress}>
      <View style={isChecked ? styles.checkedBox : styles.uncheckedBox} />
      <Text style={styles.label}>개인정보 처리동의</Text>
    </TouchableOpacity>
  );
};


export default CheckBox;