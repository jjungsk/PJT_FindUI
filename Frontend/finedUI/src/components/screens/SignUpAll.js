import React, {useState} from 'react';
// import { StyleSheet, View } from 'react-native';
import PhonePage from './PhonePage';
import InfoPage from './InfoPage';
import SignUpPage from './SignUpPage';

const SignUpAll = () => {
  const [page, setPage] = useState(1)

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
      <SignUpPage nextPage={({page})=>{
        setPage(page)
      }}/>
    )

  }
}
export default SignUpAll