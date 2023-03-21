import React from 'react';

// https://pictogrammers.com/library/mdi/ 아이콘 종류 링크
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const UserBtn = () => {
  return (
    <Icon.Button
      style={{flex: 1}}
      name="account-circle-outline"
      backgroundColor="red"
      onPress={() => console.log('testing')}>
      Test
    </Icon.Button>
  );
};

export {UserBtn};
