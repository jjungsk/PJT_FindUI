import React from 'react';
import { StyleSheet, View } from 'react-native';
import SignUpButton from '../atoms/SignUpButton';
import InfoCheck from '../organisms/InfoCheck';
import { useRecoilValue } from 'recoil';
import { nameState, addressState } from '../../store/atoms/SignUpState';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: 55,
    backgroundColor: '#ffffff'
  }
})

const InfoPage = ({nextPage}) => {
  const page = 2
  const name = useRecoilValue(nameState)
  const address = useRecoilValue(addressState)
  return(
    <View style={styles.container}>
      <InfoCheck/>
      <SignUpButton 
        onPress={(name&&address) ? () => nextPage({page: page+1}): undefined}
        disabled={!(name&&address)}
        signUpText={'다음'}
      />
    </View>
  )
}
export default InfoPage