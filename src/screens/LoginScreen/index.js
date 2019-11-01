import React, { useContext, useEffect, useState } from "react";
import { Actions } from "react-native-router-flux";
import { StyleSheet, View, Image } from "react-native";
import { Text, ThemeContext } from "react-native-elements";
import Button from '../../components/Button';
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
      <View>
        <Image source={require("../../assets/images/logo-foodmate.png")} />
      </View>
      <View style={styles.content}>
        <InputFill
          autoCapitalize='none'
          placeholder='請輸入帳號'
          value={code}
          onChangeText={text => setCode(text)}
          leftIcon={
            <Image
              resizeMode='contain'
              style={{ width: 25, height: 25 }}
              source={require("../../assets/icons/input-placeholder-donut.png")}
            />
          }
        />
        <InputFill
          autoCapitalize='none'
          placeholder='請輸入密碼'
          value={code}
          style={{ position: 'relative', width: '100%'}}
          onChangeText={text => setCode(text)}
          leftIcon={
            <Image
              resizeMode='contain'
              style={{ width: 25, height: 25 }}
              source={require("../../assets/icons/input-placeholder-lock.png")}
            />
          }
        />
        <Button
          title='登录'
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
          onPress={handleLogin(dispatch, code)}
        />
        <Button
          title='登录'
          type={theme.colors.grey3}
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
        />
      </View>
      <View style={styles.footer}>
        <Image source={require("../../assets/images/actor-login-donut.png")} />
      </View>
    </ViewBox>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginTop: 24,
    borderRadius: 50
  },
  buttonTitle: {
    fontSize: 16
  },
  content: {
    position: 'relative',
    width: 250,
    paddingTop: 80,
    alignItems: "center"
  },
  footer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: -100,
    width: 400,
    bottom: -150
  }
});

export default LoginScreen;
