import React, { useContext, useEffect, useState } from "react";
import { Actions } from "react-native-router-flux";
import { StyleSheet, View, Image } from "react-native";
import { ThemeContext } from "react-native-elements";
import Button from "../../components/Button";
import ViewBox from "../../components/ViewBox";
import InputFill from "../../components/InputFill";

const prepareHandleLogin = (payload, handleLogin) => () => {
  // Actions.jump('home');
  handleLogin(payload);
};


const LoginScreen = props => {
  const {handleLogin} = props;
  const [phone_number, setPhoneNumber] = useState("0987654321");
  const [password, setPassword] = useState("a12345678");
  const { theme } = useContext(ThemeContext);

  return (
    <ViewBox flex>
      <View style={styles.logoBox}>
        <Image
          style={styles.logo}
          source={require("../../assets/images/logo-foodmate.png")}
        />
      </View>
      <View style={styles.content}>
        <InputFill
          autoCapitalize='none'
          placeholder='請輸入電話'
          value={phone_number}
          onChangeText={text => setPhoneNumber(text)}
          style={styles.input}
          leftIcon={
            <Image
              resizeMode='contain'
              style={{ width: 25, height: 25 }}
              source={require("../../assets/icons/input-placeholder-donut.png")}
            />
          }
        />
        <InputFill
          secureTextEntry
          value={password}
          autoCapitalize='none'
          placeholder='請輸入密碼'
          onChangeText={text => setPassword(text)}
          style={styles.input}
          leftIcon={
            <Image
              resizeMode='contain'
              style={{ width: 25, height: 25 }}
              source={require("../../assets/icons/input-placeholder-lock.png")}
            />
          }
        />
        <Button
          title='登入'
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
          onPress={prepareHandleLogin({phone_number, password}, handleLogin)}
        />
        <Button
          title='註冊'
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
          onPress={() => {
            Actions.register({})
          }}
        />
        <Button
          type='clear'
          title='忘記密碼?'
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
        />
      </View>
      <View style={styles.footer}>
        <View style={styles.donutBox}>
          <Image
            contentMode='contain'
            source={require("../../assets/images/actor-login-donut.png")}
          />
        </View>
      </View>
      <View style={styles.footer}></View>
    </ViewBox>
  );
};

const styles = StyleSheet.create({
  logoBox: {
    flex: 1,
    justifyContent: "center"
  },
  logo: {
    alignItems: "center"
  },
  input: { position: "relative", width: "100%" },
  button: {
    width: 180,
    marginTop: 18,
    borderRadius: 50
  },
  buttonTitle: {
    fontSize: 16
  },
  content: {
    flex: 1.5,
    width: 250,
    height: 350,
    paddingTop: 40,
    position: "relative",
    alignItems: "center"
  },
  footer: {
    flex: 1.5,
    flexDirection: "row",
    alignItems: "center"
  },
  donutBox: {
    left: -100,
    width: 400,
    bottom: -200
  }
});

export default LoginScreen;
