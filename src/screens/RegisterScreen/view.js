import React, {useState} from 'react';
import {View, Text} from 'react-native';
import Button from '~/components/Button';
import TextInputField from '~/components/Inputs/TextInputField';
import * as yup from 'yup';
import { useNavigation } from 'react-native-navigation-hooks/dist';

const schema = yup.object().shape({
  name: yup
    .string()
    .required(),
  account: yup
    .string()
    .required()
    .matches(/\A[a-zA-Z0-9](\w){7,29}\z/),
  password: yup
    .string()
    .required()
    .matches(/\A[a-zA-Z0-9](\w){7,29}\z/),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

const onChange = (setter) => (value) => {
  const noSpaceValue = value.trim();
  setter(noSpaceValue);
};

const submit = async (payload, handleRegisteUser) => {
  try {
    const isValid = schema.isValid(payload);
    if(isValid) {
      handleRegisteUser(payload);
    }
  } catch (error) {
    console.log('submit -> error', error);
  }
};

const RegisterScreen = ({ handleRegisteUser }) => {
  const [account, setAccount] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const {pop} = useNavigation();
  const payload = {
    account,
    name,
    password,
    confirmPassword,
    pop,
  };

  return (
    <View style={{flex: 1}}>
      <TextInputField
        name='account'
        placeholder='请输入帳戶'
        value={account}
        containerStyle={{width: 300}}
        onChangeText={onChange(setAccount)}
      />
      <TextInputField
        name='name'
        placeholder='请输入用户名'
        value={name}
        containerStyle={{width: 300}}
        onChangeText={onChange(setName)}
      />
      <TextInputField
        name='password'
        value={password}
        containerStyle={{width: 300}}
        onChangeText={onChange(setPassword)}
      />
      <TextInputField
        name='confirmPassword'
        value={confirmPassword}
        containerStyle={{width: 300}}
        onChangeText={onChange(setConfirmPassword)}
      />
      <Button
        buttonStyle={{width: 300, borderRadius: 25}}
        title='註冊'
        onPress={() => submit(payload, handleRegisteUser)}
      />
      <Text>RegisterScreen</Text>
    </View>
  );
};

export default RegisterScreen;
