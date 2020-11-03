import React, {useState} from 'react';
import * as yup from 'yup';
import {View, Image, StyleSheet, ImageBackground} from 'react-native';
import {useNavigation} from 'react-native-navigation-hooks/dist';
import Button from '~/components/Button';
import logo from '~/assets/images/logo_register.png';
import InputImage from '~/components/Inputs/InputImage';
import bottomLogo from '~/assets/images/actor-register-donut.png';
import TextInputField from '~/components/Inputs/TextInputField';
import {inputDonut, inputLock, inputLetter} from '~/assets/icons';

const schema = yup.object().shape({
  name: yup.string().required(),
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

const submit = async (payload, handleRegisterUser) => {
  try {
    const isValid = schema.isValid(payload);
    if (isValid) {
      handleRegisterUser(payload);
    }
  } catch (error) {
    console.log('submit -> error', error);
  }
};

const RegisterScreen = ({handleRegisterUser}) => {
  const {pop} = useNavigation();
  const [account, setAccount] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const payload = {
    account,
    name,
    password,
    confirmPassword,
    pop,
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Image
          source={logo}
          style={{width: 210, height: 50, resizeMode: 'contain'}}
        />
      </View>
      <View style={styles.form}>
        <TextInputField
          name='account'
          placeholder='请输入用户名'
          value={account}
          containerStyle={{width: 230}}
          leftIcon={<InputImage icon={inputDonut} />}
          onChangeText={onChange(setAccount)}
        />
        <TextInputField
          name='password'
          placeholder='請輸入密碼'
          value={password}
          containerStyle={{width: 230}}
          leftIcon={<InputImage icon={inputLock} />}
          onChangeText={onChange(setPassword)}
        />
        <TextInputField
          name='confirmPassword'
          placeholder='請再次出入密碼'
          value={confirmPassword}
          containerStyle={{width: 230}}
          leftIcon={<InputImage icon={inputLock} />}
          onChangeText={onChange(setConfirmPassword)}
        />
        <TextInputField
          name='email'
          value={email}
          placeholder='請輸入 Email'
          containerStyle={{width: 230}}
          leftIcon={<InputImage icon={inputLetter} />}
          onChangeText={onChange(setEmail)}
        />
      </View>
      <View style={styles.buttonZone}>
        <Button
          title='開始交新朋友吧！'
          onPress={() => submit(payload, handleRegisterUser)}
        />
        <Button title='返回' type='outline' onPress={pop} />
      </View>
      <View style={styles.sectionImage}>
        <Image source={bottomLogo} style={styles.bottomImage} />
      </View>
    </View>
  );
};

RegisterScreen.options = {
  topBar: {
    visible: false,
  },
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
  },
  section: {
    flex: 1,
    maxHeight: 220,
    width: '100%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonZone: {
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    height: 300,
    width: '100%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomImage: {
    width: 400,
    height: 400,
  },
  sectionImage: {
    flex: 1,
    width: '100%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

export default RegisterScreen;
