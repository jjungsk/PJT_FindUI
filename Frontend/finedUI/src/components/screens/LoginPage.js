import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import LoginButton from '../atoms/LoginButton';
import LoginInput from '../atoms/LoginInput';
import GoogleButton from '../atoms/GoogleButton';
import KakaoButton from '../atoms/KakaoButton';
import Logo from '../atoms/Logo';
import {login, validateAccessToken}from '../../API/LoginApi';
import { saveTokensToKeychain, getAccessTokenFromKeychain, deleteTokensFromKeychain } from '../../store/keychain/loginToken'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '',
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgot: {
    // color:"white",
    fontSize: 11,
    marginTop: 20,
  },
  signText: {
    marginBottom: 20,
    fontSize: 18,
  },
  line: {
    borderWidth: 0.5,
    borderColor: '#575757',
    margin: 10,
    height: 1,
    width: '80%',
    marginBottom: 20,
  },
  font: {
    fontWeight: '600',
  },
});

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 로그인 시도
  const handleLogin = async () => {
    // 서버에 로그인 요청을 보내고, Access Token과 Refresh Token을 받아온다.
    const { accessToken, refreshToken, status } = await login(email, password);
    // TODO: response 반응이 200이면 로그인 되도록
    if (status == 200) {
      // Access Token과 Refresh Token을 Keychain에 저장한다.
      await saveTokensToKeychain(accessToken, refreshToken);
    }
  };

  // 자동 로그인 시도
  useEffect(() => {
    const tryAutoLogin = async () => {
      // Keychain에서 Access Token을 가져온다.
      const accessToken = await getAccessTokenFromKeychain();
      if (accessToken) {
        // 서버에 Access Token을 보내 유효성 검사를 한다.
        const isValid = await validateAccessToken(accessToken);
        if (isValid) {
          // Access Token이 유효하면 자동 로그인 성공
          // TODO: 사용자 정보를 가져와 화면을 업데이트, 정보 MainPage로 prop해서 보내면 될 듯?
        } else {
          // Access Token이 유효하지 않으면 Keychain에서 토큰을 삭제한다.
          await deleteTokensFromKeychain();
        }
      }
    };

    tryAutoLogin();
  }, []);

    return (
      <View style={styles.container}>
      <Logo />
      <LoginInput placeholderItem="이메일" value={email} onChangeText={setEmail}></LoginInput>
      <LoginInput placeholderItem="비밀번호" value={password} onChangeText={setPassword}></LoginInput>
      <LoginButton onPress={handleLogin} />
      <TouchableOpacity style={styles.signText}>
        <Text style={styles.font}>회원가입</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.forgot}>
        <Text style={styles.font}>비밀번호 찾기</Text>
      </TouchableOpacity>
      <View style={styles.line} />
      <GoogleButton />
      <KakaoButton />
    </View>
  );
};

export default LoginPage;
