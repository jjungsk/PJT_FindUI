import React from 'react';
// import {Text, View} from 'react-native';
import styled from 'styled-components/native';

const InputContainer = styled.TextInput`
  width: 100%;
  border: 1px solid;
  border-color: #1977f3;
  ${'' /* border-radius: 5px;
  line-height: 2.5rem;
  font-size: 1.2rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem; */}
`;


const LoginInput = () => {
  return (<InputContainer />);
};
export default LoginInput;
