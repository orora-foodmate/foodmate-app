import React, { useEffect, useContext, Fragment } from "react";
import { ThemeContext } from "react-native-elements";
import { StyleSheet, Dimensions, Image } from "react-native";
import { Scene, Router, Tabs, Stack, Actions } from "react-native-router-flux";
import HomeScreen from "../HomeScreen";
import ChatScreen from "../ChatScreen";
import LoginScreen from "../LoginScreen";
import AccountScreen from "../AccountScreen";
import RegisterScreen from "../RegisterScreen";
import InitialAppScreen from '../InitialAppScreen';
import CreateActivityScreen from "../CreateActivityScreen";
import { more } from "../../assets/icons";
import { initialAppAction } from "./actions";
import { ReducerContext } from "../../reducers";
import { IconChat, IconFriends, IconAccount } from "../../components/Icons";
import Dialogbox from "../../components/Dialogbox";

const { width, height } = Dimensions.get("window");

const MainScreen = props => {
  const [{ setting, globalMessage }, dispatch] = useContext(ReducerContext);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    dispatch(initialAppAction());
  }, []);

  if (!setting.get("isInitialed")) {
    return (
      <Image
        style={styles.image}
        // source={require('../../assets/images/splash.png')}
      />
    );
  }

  const stateHandler = (prevState, newState, action) => {
    console.log("onStateChange: ACTION:", action);
  };

  return (
    <Fragment>
      <Dialogbox
        isVisible={globalMessage.get("isVisible")}
        type={globalMessage.get("type")}
        descript={globalMessage.get("message")}
        confirmText='確認'
        onConfirm={console.log}
        onCancel={console.log}
      />
      <Router
        onStateChange={stateHandler}
        navigationBarStyle={{ backgroundColor: theme.colors.grey1 }}
        sceneStyle={{ backgroundColor: "white" }}
      >
        <Stack key='root' hideNavBar>
          <Scene key='initialScene' component={InitialAppScreen} />
          <Stack key='login_stack'>
            <Scene key='register' component={RegisterScreen} title='Register' />
            <Scene
              key='login'
              component={LoginScreen}
              title='Login'
              hideNavBar
            />
          </Stack>
          <Tabs
            key='tabs_bar'
            backToInitial
            routeName='tabs_bar'
            tabStyle={{ backgroundColor: theme.colors.grey1, paddingTop: 8 }}
            tabBarStyle={{ backgroundColor: theme.colors.grey1 }}
            activeTintColor={theme.colors.primary}
            inactiveTintColor={theme.colors.grey4}
          >
            <Stack
              key='create_activity_stack'
              title='建立活動'
              icon={IconChat}
            >
              <Scene
                key='create_activity'
                component={CreateActivityScreen}
                title='建立活動'
              />
            </Stack>
            <Stack
              key='activities_stack'
              title='活動列表'
              icon={IconChat}
            >
              <Scene key='home' component={HomeScreen} title='活動列表' />
            </Stack>
            <Stack
              key='account_stack'
              title='個人資料'
              icon={IconFriends}
            >
              <Scene key='account' component={AccountScreen} title='個人資料' />
            </Stack>
            <Stack key='chat_stack' title='聊天' icon={IconAccount}>
              <Scene
                key='chat'
                component={ChatScreen}
                title='聊天'
              />
            </Stack>
          </Tabs>
        </Stack>
      </Router>
    </Fragment>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  image: {
    width,
    height
  }
});
