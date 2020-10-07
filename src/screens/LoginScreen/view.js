import React, { useEffect, useState } from 'react';
import { Icon } from 'react-native-elements';
import { StyleSheet, View } from 'react-native';
import Button from '~/components/Button';
import PasswordInput from '~/components/Inputs/PasswordInput';
import TextInputField from '~/components/Inputs/TextInputField';
import colors from '~/theme/color';
import rootNavigator from '~/navigation/rootNavigator';

const onChange = setter => value => {
  const noSpaceValue = value.trim();
  setter(noSpaceValue);
};

const LoginScreen = ({
  isAuth,
  handleLogin,
}) => {
  const [account, setAccount] = useState('horsekit1982@gmail.com');
  const [password, setPassword] = useState('a12345678');

  const payload = {
    account,
    password,
    grant_type: 'password',
  };

  const onPress = () => {
    handleLogin(payload);
  }

  useEffect(() => {
    if(isAuth) {
      rootNavigator();
    }
  }, [isAuth]);

  return (
    <View style={styles.container}>
      <TextInputField
          // label='用户名'
          placeholder='请输入用户名'
          value={account}
          containerStyle={{ width: 300 }}
          onChangeText={onChange(setAccount)}
          leftIcon={<Icon type='feather' name='user' containerStyle={{ width: 24} } color={colors.black} />}
        />
      <PasswordInput
        value={password}
        containerStyle={{ width: 300 }}
        onChangeText={onChange(setPassword)}
        leftIcon={<Icon type='feather' name='key' containerStyle={{ width: 24} } color={colors.black} />}
      />
      <Button
        buttonStyle={{ width: 300, borderRadius: 25 }}
        title='Login'
        onPress={onPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

LoginScreen.options = {
  topBar: {
    title: {
      text: 'LoginScreen'
    }
  },
  bottomTab: {
    text: 'Login'
  }
};

export default LoginScreen;
