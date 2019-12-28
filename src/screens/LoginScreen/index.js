import React, { useContext, useEffect, useState } from "react";
import { Actions } from "react-native-router-flux";
import { StyleSheet, View, Image } from "react-native";
import { Text, ThemeContext } from "react-native-elements";
import Button from "../../components/Button";
import ViewBox from "../../components/ViewBox";
import InputFill from "../../components/InputFill";
import { loginAction } from "./actions";
import { ReducerContext } from "../../reducers";
import { encodeAuthBasicToken } from "../../helpers/authHelpers";

const handleLogin = (dispatch, code) => () => {
  const payload = {
    username: encodeAuthBasicToken(code),
    password: "a123456789",
    grant_type: "password"
  };
  Actions.jump('home');
  loginAction(dispatch, payload);
};


const LoginScreen = props => {
  const [code, setCode] = useState("");
  const [{ auth }, dispatch] = useContext(ReducerContext);
  const { theme } = useContext(ThemeContext);

  const handleScan = () => {
    console.log("TCL: handleScan -> handleScan");
  };

  useEffect(() => {
    if (auth.isAuth) Actions.reset("tabbar", { aaa: "ccc" });
  }, [auth.isAuth]);

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
          placeholder='請輸入帳號'
          value={code}
          onChangeText={text => setCode(text)}
          style={{ position: "relative", width: "100%" }}
          leftIcon={
            <Image
              resizeMode='contain'
              style={{ width: 25, height: 25 }}
              source={require("../../assets/icons/input-placeholder-donut.png")}
            />
          }
        />
        <InputFill
          value={code}
          autoCapitalize='none'
          placeholder='請輸入密碼'
          onChangeText={text => setCode(text)}
          style={{ position: "relative", width: "100%" }}
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
        />
        <Button
          title='註冊'
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
          onPress={() => Actions.register({})}
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
