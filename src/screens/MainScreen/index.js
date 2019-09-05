import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Dimensions, Image, View } from "react-native";
import initialPromise from "./actionPromises/initialPromises";
import { ReducerContext } from "../../reducers";
import { ThemeContext } from "react-native-elements";
import { Scene, Router, Stack } from "react-native-router-flux";
import AppScreen from "../AppScreen";
import LoginScreen from "../LoginScreen";
import AccountScreen from "../AccountScreen";
import FriendsScreen from "../FriendsScreen";
import RegisterScreen from "../RegisteScreen";
import { IconChat, IconFriends, IconAccount } from "../../components/Icons";

const { width, height } = Dimensions.get("window");

const MainScreen = props => {
  const [isInitialApp, setIsInitialApp] = useState(false);
  const [{ auth }] = useContext(ReducerContext);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    initialPromise(setIsInitialApp);
  }, [setIsInitialApp]);

  if (!isInitialApp) {
    return (
      <Image
        style={styles.image}
        source={require("../../assets/images/splash.png")}
      />
    );
  }

  const stateHandler = (prevState, newState, action) => {
    console.log("onStateChange: ACTION:", action);
  };

  return (
    <Router
      stateHandler={stateHandler}
      navigationBarStyle={{ backgroundColor: theme.colors.grey1 }}
      sceneStyle={{ backgroundColor: "white" }}
    >
      <Scene key='root' hideNavBar>
        <Stack key='login_stack'>
          <Scene key='login' component={LoginScreen} title='Login' hideNavBar />
          <Scene key='register' component={RegisterScreen} title='Register' />
        </Stack>
        <Stack
          key='app_stack'
          tabs
          tabStyle={{ backgroundColor: theme.colors.grey1, paddingTop: 8 }}
          tabBarStyle={{ backgroundColor: theme.colors.grey1 }}
          activeTintColor={theme.colors.primary}
          inactiveTintColor={theme.colors.grey4}
        >
          <Scene
            key='home'
            component={AppScreen}
            title='聊天'
            icon={IconChat}
          />
          <Scene
            key='test'
            component={FriendsScreen}
            title='好友'
            icon={IconFriends}
          />
          <Scene
            key='account'
            component={AccountScreen}
            title='我'
            icon={IconAccount}
          />
        </Stack>
      </Scene>
    </Router>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  image: {
    width,
    height
  }
});
