import React, { useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { StyleSheet, View } from "react-native";
import { Avatar, Input, Button, Text } from "react-native-elements";

const LoginScreen = props => {
  const { navigation, isAuth } = props;
  useEffect(() => {
    if (isAuth) navigation.navigate("Home");
  }, [isAuth]);

  const handleLogin = () => props.handleLogin();

  return (
    <View style={styles.container}>
      <Avatar size='xlarge' title='MD' />
      <View style={styles.inputBox}>
        <Input
          placeholder='手機號碼'
          leftIcon={<Icon name='user' size={24} color='#ebebeb' />}
        />
        <Input
          placeholder='密碼'
          leftIcon={<Icon name='lock' size={24} color='#ebebeb' />}
        />
      </View>
      <Button
        title='登入'
        onPress={handleLogin}
      />
      <Button
        title='註冊'
        onPress={handleLogin}
      />
      <Text style={styles.text}>忘記密碼？</Text>
    </View>
  );
};

LoginScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    textAlign: "center",
    color: "#bdbdbd"
  }
});
export default LoginScreen;
