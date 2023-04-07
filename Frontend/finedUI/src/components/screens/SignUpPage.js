import React from 'react';
import { StyleSheet, View } from 'react-native';
import SignUpButton from '../atoms/SignUpButton';
import SignUp from '../organisms/SignUp';
import { useRecoilValue } from 'recoil';
import { emailState, passwordState, pwConfirmState } from '../../store/atoms/SignUpState';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: 55,
    backgroundColor: '#ffffff'
  }
})

const SignUpPage = ({signUp}) => {
  const email = useRecoilValue(emailState);
  const password = useRecoilValue(passwordState);
  const passwordConfirm = useRecoilValue(pwConfirmState);
  return(
    <View style={styles.container}>
      <SignUp/>
      <SignUpButton 
        onPress={(email&&password&&passwordConfirm) ? signUp : undefined}
        disabled={!(email&&password&&passwordConfirm)}
        signUpText={'회원가입'}
      />
    </View>
  )
}
export default SignUpPage