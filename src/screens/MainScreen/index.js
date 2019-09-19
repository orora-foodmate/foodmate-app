import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "react-native-elements";
import { StyleSheet, Dimensions, Image, View } from "react-native";
import { Scene, Router, Tabs, Stack, Actions } from "react-native-router-flux";
import AppScreen from "../AppScreen";
import ChatScreen from "../ChatScreen";
import BlockScreen from "../BlockScreen";
import LoginScreen from "../LoginScreen";
import SearchScreen from "../SearchScreen";
import MyCodeScreen from "../MyCodeScreen";
import AccountScreen from "../AccountScreen";
import FriendsScreen from "../FriendsScreen";
import RegisterScreen from "../RegisteScreen";
import EditNameScreen from "../EditNameScreen";
import AddFriendsScreen from "../AddFriendsScreen";
import InfoSettingScreen from "../InfoSettingScreen";
import {initialAppAction} from './actions';
import { more } from "../../assets/icons";
import { ReducerContext } from "../../reducers";
import { IconChat, IconFriends, IconAccount } from "../../components/Icons";

const { width, height } = Dimensions.get("window");

const MainScreen = props => {
  const [ {setting}, dispatch] = useContext(ReducerContext);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    dispatch(initialAppAction());
  }, []);

  if (!setting.get('isInitialed')) {
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

  const openMenu = () => {
    Actions.drawerOpen("drawMenu");
  };

  return (
    <Router
      onStateChange={stateHandler}
      navigationBarStyle={{ backgroundColor: theme.colors.grey1 }}
      sceneStyle={{ backgroundColor: "white" }}
    >
      <Stack key='root' hideNavBar>
        <Stack key='login_stack'>
          <Scene key='login' component={LoginScreen} title='Login' hideNavBar />
          <Scene key='register' component={RegisterScreen} title='Register' />
        </Stack>

        <Tabs
          key='tabbar'
          routeName='tabbar'
          backToInitial
          tabStyle={{ backgroundColor: theme.colors.grey1, paddingTop: 8 }}
          tabBarStyle={{ backgroundColor: theme.colors.grey1 }}
          activeTintColor={theme.colors.primary}
          inactiveTintColor={theme.colors.grey4}
        >
          <Stack
            key='home'
            title='聊天'
            icon={IconChat}
            rightButtonImage={more}
            onRight={openMenu}
          >
            <Scene key='home' component={AppScreen} title='聊天' />
            <Scene key='search' component={SearchScreen} title='搜索' back />
            <Scene
              key='chat'
              component={ChatScreen}
              title='聊天'
              hideTabBar
              back
            />
            <Scene
              key='addFriends'
              component={AddFriendsScreen}
              title='添加好友/群'
              back
            />
          </Stack>

          <Stack
            key='friends'
            title='好友'
            icon={IconFriends}
            rightButtonImage={more}
            onRight={openMenu}
          >
            <Scene key='friends' component={FriendsScreen} title='好友' />
            <Scene
              key='infoSetting'
              component={InfoSettingScreen}
              title='聊天对象设定'
              hideTabBar
              back
            />
            <Scene
              key='editFriendName'
              component={EditNameScreen}
              title='修改昵称'
              hideTabBar
              back
            />
          </Stack>

          <Stack key='account' title='我' icon={IconAccount}>
            <Scene
              key='account'
              component={AccountScreen}
              title='我'
              hideNavBar
            />
            <Scene
              key='editName'
              component={EditNameScreen}
              title='修改昵称'
              hideTabBar
              back
            />
            <Scene
              key='myCode'
              component={MyCodeScreen}
              title='我的二维码'
              hideTabBar
              back
            />
            <Scene
              key='block'
              component={BlockScreen}
              title='黑名单'
              hideTabBar
              back
            />
          </Stack>
        </Tabs>
      </Stack>
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
