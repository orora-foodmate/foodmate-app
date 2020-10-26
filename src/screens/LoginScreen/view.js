import React, { useRef, useState } from 'react';
import { useNavigation } from 'react-native-navigation-hooks/dist';
import { Icon } from 'react-native-elements';
import { StyleSheet, View } from 'react-native';
import Button from '~/components/Button';
import PasswordInput from '~/components/Inputs/PasswordInput';
import TextInputField from '~/components/Inputs/TextInputField';
import colors from '~/theme/color';

const onChange = setter => value => {
  const noSpaceValue = value.trim();
  setter(noSpaceValue);
};

const LoginScreen = ({
  handleLogin,
}) => {
  let cameraRef = useRef(null);
  const [account, setAccount] = useState('horsekit1982@gmail.com');
  const [password, setPassword] = useState('a12345678');  

  const { push } = useNavigation();

  const payload = {
    account,
    password,
    grant_type: 'password',
  };

  const onPress = () => {
    handleLogin(payload);
  }

  return (
    <View style={styles.container}>
      <TextInputField
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
        title='登入'
        onPress={onPress}
        buttonStyle={{ width: 230, borderRadius: 25 }}
      />
      <Button
        buttonStyle={{ width: 300, borderRadius: 25 }}
        title='註冊'
        onPress={() => push('Registe')}
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
