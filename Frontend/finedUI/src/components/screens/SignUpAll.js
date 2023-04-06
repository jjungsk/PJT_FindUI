import React, {useState} from 'react';
import PhonePage from './PhonePage';
import InfoPage from './InfoPage';
import SignUpPage from './SignUpPage';
import { signup } from '../../API/AccountApi';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { nameState, addressState, emailState, phoneState, passwordState, pwConfirmState } from '../../store/atoms/SignUpState'
import { Alert } from 'react-native';

const SignUpAll = ({navigation}) => {
  const [page, setPage] = useState(1)
  const name = useRecoilValue(nameState);
  const address = useRecoilValue(addressState);
  const email = useRecoilValue(emailState);
  const password = useRecoilValue(passwordState);
  const passwordConfirm = useRecoilValue(pwConfirmState);
  const phoneNumber = useRecoilValue(phoneState);
  const signUp = async () => {
    if (password !== passwordConfirm) {
      Alert.alert("비밀번호를 다시 확인해주세요.")
      return ;
    }
    const response = await signup(name, address, email, password, phoneNumber)
    if (response.status === 200) {
      Alert.alert("회원가입 완료",  "회원가입이 완료되었습니다.")
    } else {
      Alert.alert("회원가입 실패", "서버문제로 회원가입이 실패했습니다. 잠시 후 다시 시도해주세요.")
    }
    navigation.reset({routes: [{name: 'LoginPage'}]})
    console.log(response)
  }

  if (page === 1) {
    return(
      <PhonePage nextPage={({page})=>{
        setPage(page)
      }}/>
    )
  } else if (page === 2) {
    return(
      <InfoPage nextPage={({page})=>{
        setPage(page)
      }}/>
    )
  } else {
    return(
      <SignUpPage signUp={signUp}/>
    )

  }
}
export default function WrappedSignUpAll({navigation}) {
  return (
    <RecoilRoot key={'sign'}>
      <SignUpAll navigation={navigation}/>
    </RecoilRoot>
  )
}