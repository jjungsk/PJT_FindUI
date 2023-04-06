import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

// recoil
import {useRecoilState} from 'recoil';

import {
  fontPercentage,
  heightPercentage,
  widthPercentage,
} from '../../styles/ResponsiveSize';
import {registGender} from '../store_regist/registStore';

const styles = StyleSheet.create({
  genderContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: widthPercentage(8),
    marginVertical: heightPercentage(8),
  },
  genderBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: heightPercentage(2),
    marginHorizontal: widthPercentage(8),
    borderWidth: 1,
    borderColor: '#EAECF5',
    borderRadius: 8,
  },
  btnSelected: {
    backgroundColor: '#0086C9',
  },
  btnUnSelected: {
    backgroundColor: '#E0F2FE',
  },
  genderTitle: {
    fontSize: fontPercentage(16),
    fontWeight: '700',
  },
  titleSelected: {
    color: '#ffffff',
  },
  titleUnSelected: {
    color: '#000000',
  },
});

const SelectGender = ({sex = 0}) => {
  const [gender, setGender] = useRecoilState(registGender);

  const genderData = [
    {des: '남자', val: 1},
    {des: '여자', val: 2},
  ];

  useEffect(() => {
    setGender(sex);
  }, []);

  return (
    <View style={styles.genderContainer}>
      {genderData.map(item => {
        return (
          <TouchableOpacity
            activeOpacity={0.6}
            key={item.des}
            style={[
              styles.genderBtn,
              item.val === gender ? styles.btnSelected : styles.btnUnSelected,
            ]}
            onPress={() => {
              setGender(item.val);
            }}>
            <Text
              style={[
                styles.genderTitle,
                item.val === gender
                  ? styles.titleSelected
                  : styles.titleUnSelected,
              ]}>
              {item.des}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default SelectGender;
