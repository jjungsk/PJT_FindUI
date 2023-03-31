import React from 'react';
import { StyleSheet, View } from 'react-native';
import SignUpButton from '../atoms/SignUpButton';
import InfoCheck from '../organisms/InfoCheck';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: 55
  }
})

const InfoPage = ({nextPage}) => {
  const page = 2
  return(
    <View style={styles.container}>
      <InfoCheck/>
      <SignUpButton 
        onPress={() => nextPage({page: page+1})}
        signUpText={'다음'}
      />
    </View>
  )
}
export default InfoPage