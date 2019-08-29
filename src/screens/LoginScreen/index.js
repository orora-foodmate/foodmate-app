import React, { useContext, useEffect } from 'react';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, View } from 'react-native';
import { Avatar, Input, Button, Text, withTheme } from 'react-native-elements';
import { ReducerContext } from '../../reducers';

function mockFetch() {
  return new Promise(resolve => {
    setTimeout(resolve, 2000);
  });
}

const LoginScreen = props => {
  const {theme} = props;
  const [{auth}, dispatch] = useContext(ReducerContext);

  const handleLogin = () => dispatch({types: ['LOGIN', 'LOGIN_SUCCESS', 'LOGIN_ERROR'], promise: mockFetch()});
  useEffect(() => {
    if(auth.isAuth) Actions.reset('app_stack', {aaa: 'ccc'})
  }, [auth.isAuth])

  return (
    <View style={styles.container}>
      <Avatar
        size={144}
        title='IM'
        titleStyle={{ color: theme.colors.primary }}
        overlayContainerStyle={{ backgroundColor: "white" }}
      />
      <Input
        containerStyle={{ marginTop: 80 }}
        placeholder='请输入识别码'
        leftIcon={<Icon name='lock' size={24} color='grey' />}
      />
      <Button
        title='登录'
        titleStyle={{ fontSize: 20 }}
        onPress={handleLogin}
      />
      <Button type='clear' title='扫描二维码登录' onPress={handleLogin} />
      <View style={styles.footer}>
        <Text style={{ color: theme.colors.primary}}>帮助中心</Text>
        <Text style={{ color: theme.colors.grey3 }}>| v0.01</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6F6F6"
  },
  footer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: 300,
    bottom: 20
  }
});

export default withTheme(LoginScreen)

