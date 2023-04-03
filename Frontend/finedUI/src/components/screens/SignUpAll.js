import React, {useState} from 'react';
// import { StyleSheet, View } from 'react-native';
import PhonePage from './PhonePage';
import InfoPage from './InfoPage';
import SignUpPage from './SignUpPage';
import { signup } from '../../API/AccountApi';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { nameState, addressState, emailState, phoneState, passwordState } from '../../store/atoms/SignUpState'

const SignUpAll = () => {
  const [page, setPage] = useState(1)
  const name = useRecoilValue(nameState);
  const address = useRecoilValue(addressState);
  const email = useRecoilValue(emailState);
  const password = useRecoilValue(passwordState);
  const phoneNumber = useRecoilValue(phoneState);
  const signUp = async () => {
    console.log(name, address, email, password, phoneNumber)
    const response = await signup(name, address, email, password, phoneNumber)
    console.log(response.statusCode)
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
export default function WrappedSignUpAll() {
  return (
    <RecoilRoot key={'sign'}>
      <SignUpAll />
    </RecoilRoot>
  )
}