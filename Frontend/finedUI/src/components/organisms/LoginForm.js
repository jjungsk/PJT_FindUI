import React, {useState} from 'react';
// import TextField from '@material-ui/core/TextField';
import {Button, TextInput, View} from 'react-native';
// 임시 로그인 코든
const LoginForm = ({onSubmit}) => {
  const [username, setUsername] = useState('');
  let handleUserNameChange = event => setUsername(event.target.value);
  // const [username, setUsername] = useState('');
  let handleSubmit = () => {
    onSubmit(username);
  };

  return (
    <View>
      <TextInput
        label="Type your username"
        placeholder="Username"
        onChangeText={setUsername}
      />
      <Button color="#f194ff" onPress={handleSubmit} title="Login" />
    </View>
  );
};

export default LoginForm;
