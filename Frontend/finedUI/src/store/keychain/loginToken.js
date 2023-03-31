import { setInternetCredentials, getInternetCredentials, resetInternetCredentials } from 'react-native-keychain';

const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN';
const REFRESH_TOKEN_KEY = 'REFRESH_TOKEN';

// Access Token과 Refresh Token을 저장하는 함수
export const saveTokensToKeychain = async (accessToken, refreshToken) => {
  await setInternetCredentials('Auth', ACCESS_TOKEN_KEY, accessToken);
  await setInternetCredentials('Auth', REFRESH_TOKEN_KEY, refreshToken);
};

// Access Token을 가져오는 함수
export const getAccessTokenFromKeychain = async () => {
  const credentials = await getInternetCredentials('Auth', ACCESS_TOKEN_KEY);
  if (credentials) {
    return credentials.password;
  }
  return null;
};

// Refresh Token을 가져오는 함수
export const getRefreshTokenFromKeychain = async () => {
  const credentials = await getInternetCredentials('Auth', REFRESH_TOKEN_KEY);
  if (credentials) {
    return credentials.password;
  }
  return null;
};

// Access Token과 Refresh Token을 삭제하는 함수
export const deleteTokensFromKeychain = async () => {
  await resetInternetCredentials('Auth', ACCESS_TOKEN_KEY);
  await resetInternetCredentials('Auth', REFRESH_TOKEN_KEY);
};
