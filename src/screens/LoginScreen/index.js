import React, { useContext, useEffect } from "react";
import { Actions } from "react-native-router-flux";
import { StyleSheet, View } from "react-native";
import { Avatar, Button, Text, ThemeContext } from "react-native-elements";
import ViewBox from "../../components/ViewBox";
import InputFill from "../../components/InputFill";
import { ReducerContext } from "../../reducers";

function mockFetch() {
  return new Promise(resolve => {
    setTimeout(resolve, 2000);
  });
}

const handleLogin = () =>
  dispatch({
    types: ["LOGIN", "LOGIN_SUCCESS", "LOGIN_ERROR"],
    promise: mockFetch()
  });

const handleScan = () =>
  console.log("TCL: handleScan -> handleScan");

const LoginScreen = props => {
  const [{ auth }, dispatch] = useContext(ReducerContext);
  const { theme } = useContext(ThemeContext);

  

  useEffect(() => {
    if (auth.isAuth) Actions.reset("tabbar", { aaa: "ccc" });
  }, [auth.isAuth]);

  return (
    <ViewBox color='grey1' flex>
      <Avatar
        size={144}
        title='F'
        titleStyle={{ color: theme.colors.primary }}
        overlayContainerStyle={{ backgroundColor: "white" }}
      />
      <View style={styles.content}>
        <InputFill placeholder='手機號碼' iconName='dotcircle' />
        <InputFill placeholder='密碼' iconName='lock' />
        <Button
          title='登入'
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
          onPress={handleLogin}
        />
        <Button
          title='註冊'
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
          onPress={handleLogin}
        />
        <Button
          type="clear"
          title='忘記密碼?'
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
          onPress={handleLogin}
        />
      </View>
      <View style={styles.footer}>
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
    alignItems: "center"
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

export default LoginScreen;
