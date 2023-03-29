import React, {useState} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import SignUpButton from '../atoms/SignUpButton';
import SignUpText from '../atoms/SignUpText';
import PhoneVerify from '../organisms/PhoneVerify';
import PrivacyPolicyModal from '../organisms/PrivacyPolicyModal';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: 55,
  }
})

const PhonePage = () => {
  const [isChecked, setIsChecked] = useState(false)
  return(
    <View style={styles.container}>
      <View style={{width:"80%", justifyContent:"center"}}>
        <SignUpText text={'본인인증'} />
      </View>
      <PhoneVerify />
      <View style={{width:"80%", justifyContent:"center"}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <CheckBox disabled={false} value={isChecked} onValueChange={(val)=>setIsChecked(val)}/>
          <Text style={{fontSize: 18}}>개인정보 처리동의</Text>
        </View>
        <PrivacyPolicyModal />
      </View>
      <SignUpButton signUpText={'다음'} />
    </View>
  )
}
export default PhonePage