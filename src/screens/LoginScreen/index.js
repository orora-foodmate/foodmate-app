import React, { useContext, useEffect } from "react";
import { Actions } from "react-native-router-flux";
import { StyleSheet, View } from "react-native";
import { Avatar, Button, Text, withTheme } from "react-native-elements";
import InputFill from "../../components/InputFill";
import { ReducerContext } from "../../reducers";

function mockFetch() {
  return new Promise(resolve => {
    setTimeout(resolve, 2000);
  });
}

const LoginScreen = props => {
  const { theme } = props;
  const [{ auth }, dispatch] = useContext(ReducerContext);

  const handleLogin = () =>
    dispatch({
      types: ["LOGIN", "LOGIN_SUCCESS", "LOGIN_ERROR"],
      promise: mockFetch()
    });

  const handleScan = () => {
    console.log("TCL: handleScan -> handleScan");
  };

  useEffect(() => {
    if (auth.isAuth) Actions.reset("app_stack", { aaa: "ccc" });
  }, [auth.isAuth]);

  return (
    <View style={styles.container}>
      <Avatar
        size={144}
        title='IM'
        titleStyle={{ color: theme.colors.primary }}
        overlayContainerStyle={{ backgroundColor: "white" }}
      />
      <View style={styles.content}>
        <InputFill placeholder='请输入识别码' iconName='lock' />
        <Button
          title='登录'
          buttonStyle={{ marginTop: 24 }}
          titleStyle={{ fontSize: 20 }}
          onPress={handleLogin}
        />
        <Button type='clear' title='扫描二维码登录' onPress={handleScan} />
      </View>
      <View style={styles.footer}>
        <Text style={{ color: theme.colors.primary }}>帮助中心</Text>
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

export default withTheme(LoginScreen);
