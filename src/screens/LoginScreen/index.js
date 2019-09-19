import React, { useContext, useEffect, useState } from 'react';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, View } from 'react-native';
import { Avatar, Button, Text, ThemeContext } from 'react-native-elements';
import ViewBox from '../../components/ViewBox';
import InputFill from '../../components/InputFill';
import { ReducerContext } from '../../reducers';
import { loginAction } from './actions';

const handleLogin = (dispatch, code) => () => {
  const payload = { username: code,password: 'a123456789', grant_type: 'password'};
  loginAction(dispatch, payload);
};

const LoginScreen = props => {
  const [code, setCode] = useState('');
  const [{ auth }, dispatch] = useContext(ReducerContext);
  const { theme } = useContext(ThemeContext);  

  const handleScan = () => {
    console.log('TCL: handleScan -> handleScan');
  };

  useEffect(() => {
    if (auth.isAuth) Actions.reset('tabbar', { aaa: 'ccc' });
  }, [auth.isAuth]);

  return (
    <ViewBox color='grey1' flex>
      <Avatar
        size={144}
        title='IM'
        titleStyle={{ color: theme.colors.primary }}
        overlayContainerStyle={{ backgroundColor: 'white' }}
      />
      <View style={styles.content}>
        <InputFill
          autoCapitalize='none'
          placeholder='请输入识别码'
          iconName='lock'
          value={code}
          onChangeText={text => setCode(text)}
        />
        <Button
          title='登录'
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
          onPress={handleLogin(dispatch, code)}
        />
        <Button type='clear' title='扫描二维码登录' onPress={handleScan} />
      </View>
      <View style={styles.footer}>
        <Text style={{ color: theme.colors.primary }}>帮助中心</Text>
        <Text style={{ color: theme.colors.grey3 }}>| v0.01</Text>
      </View>
    </ViewBox>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 300,
    marginTop: 24
  },
  buttonTitle: {
    fontSize: 20
  },
  content: {
    paddingTop: 80,
    alignItems: 'center'
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: 300,
    bottom: 20
  }
});

export default LoginScreen;
