import React, {useState} from 'react';
// import { StyleSheet, View } from 'react-native';
import PhonePage from './PhonePage';
import InfoPage from './InfoPage';
import SignUpPage from './SignUpPage';
import { signup } from '../../API/AccountApi';

const SignUpAll = () => {
  const [page, setPage] = useState(1)
  
  const signUp = async () => {
    const response = await signup(name, address, email, password, phoneNumber)
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
export default SignUpAll