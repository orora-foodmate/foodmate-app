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

const LoginScreen = props => {
  const [{ auth }, dispatch] = useContext(ReducerContext);
  const { theme } = useContext(ThemeContext);

  const handleLogin = () =>
    dispatch({
      types: ["LOGIN", "LOGIN_SUCCESS", "LOGIN_ERROR"],
      promise: mockFetch()
    });

  const handleScan = () => {
    console.log("TCL: handleScan -> handleScan");
  };

  useEffect(() => {
    if (auth.isAuth) Actions.reset("tabbar", { aaa: "ccc" });
  }, [auth.isAuth]);

  return (
    <ViewBox color='grey1' flex>
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
          buttonStyle={{ width: 300, marginTop: 24 }}
          titleStyle={{ fontSize: 20 }}
          onPress={handleLogin}
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
