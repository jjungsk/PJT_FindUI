import { Linking } from "react-native";
import LoginPage from '../components/screens/LoginPage'

Linking.addEventListener('url', (event) => {
  const { path } = event.url;
  if (path === 'LoginPage') {
    return <LoginPage />;
  }
});