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
  return(
    <View style={styles.container}>
      <InfoCheck/>
      <SignUpButton 
        page={2} nextPage={nextPage}
        signUpText={'다음'}
      />
    </View>
  )
}
export default InfoPage