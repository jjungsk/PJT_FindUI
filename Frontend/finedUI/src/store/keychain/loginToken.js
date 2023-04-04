import * as Keychain from 'react-native-keychain';

const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN';
const REFRESH_TOKEN_KEY = 'REFRESH_TOKEN';
const SERVICE_NAME = 'Auth';

// Access Token과 Refresh Token을 저장하는 함수
export const saveAccessToKeychain = async (accessToken) => {
  await Keychain.setInternetCredentials(SERVICE_NAME, ACCESS_TOKEN_KEY, accessToken);
};

// Access Token과 Refresh Token을 저장하는 함수
export const saveRefreshToKeychain = async (refreshToken) => {
  await Keychain.setInternetCredentials(SERVICE_NAME, REFRESH_TOKEN_KEY, refreshToken);
};

// Access Token을 가져오는 함수
export const getAccessTokenFromKeychain = async () => {
  const credentials = await Keychain.getInternetCredentials(SERVICE_NAME, ACCESS_TOKEN_KEY);
  if (credentials) {
    return credentials.password;
  }
  return null;
};

// Refresh Token을 가져오는 함수
export const getRefreshTokenFromKeychain = async () => {
  const credentials = await Keychain.getInternetCredentials(SERVICE_NAME, REFRESH_TOKEN_KEY);
  if (credentials) {
    return credentials.password;
  }
  return null;
};

// Access Token과 Refresh Token을 삭제하는 함수
export const deleteTokensFromKeychain = async () => {
  await Keychain.resetInternetCredentials(SERVICE_NAME, ACCESS_TOKEN_KEY);
  await Keychain.resetInternetCredentials(SERVICE_NAME, REFRESH_TOKEN_KEY);
};