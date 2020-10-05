import React, { Fragment, useEffect } from "react";
import { StyleSheet, Dimensions, Image } from "react-native";
import { privateScreens, publicScreens } from "~/navigation";
// import HomeScreen from "../HomeScreen";
// import ChatScreen from "../ChatScreen";
// import LoginScreen from "../LoginScreen";
// import AccountScreen from "../AccountScreen";
// import RegisterScreen from "../RegisterScreen";
// import InitialAppScreen from "../InitialAppScreen";
// import CreateActivityScreen from "../CreateActivityScreen";
// import { IconChat, IconCreate, IconDonut, IconActivities } from "../../components/Icons";

const { width, height } = Dimensions.get("window");

const InitialScreen = props => {
  const { isInitialed, isAuth, handleInitialApp } = props;

  console.log("isInitialed", isInitialed)
  
  useEffect(() => {
    handleInitialApp();
  }, []);

  useEffect(() => {
    if(isInitialed) {
      isAuth ? privateScreens() : publicScreens();
    }
  }, [isAuth, isInitialed]);;
  return (
    <Fragment>
      <Image
        style={styles.image}
        source={require("../../assets/images/splash.png")}
      />
      {/* <Router
        onStateChange={stateHandler}
        navigationBarStyle={{ backgroundColor: theme.colors.grey1 }}
        sceneStyle={{ backgroundColor: "white" }}
      >
        <Stack key='root' hideNavBar>
          <Scene key='initialScene' component={InitialAppScreen} />
          <Stack key='login_stack'>
            <Scene
              key='login'
              component={LoginScreen}
              title='Login'
              hideNavBar
            />
            <Scene key='register' component={RegisterScreen} title='Register' />
          </Stack>
          <Tabs
            key='tabs_bar'
            backToInitial
            routeName='tabs_bar'
            activeTintColor='#eee'
            tabStyle={{ backgroundColor: '#fff', paddingTop: 8 }}
            tabBarStyle={{ backgroundColor: '#fff' }}
            activeTintColor={theme.colors.primary}
            inactiveTintColor='#ddd'
          >
            <Stack key='create_activity_stack' title='建立活動' icon={IconCreate}>
              <Scene
                title='建立活動'
                key='create_activity'
                component={CreateActivityScreen}
                hideNavBar
              />
            </Stack>
            <Stack key='activities_stack' title='活動列表' icon={IconActivities}>
              <Scene
                key='home'
                title='活動列表'
                component={HomeScreen}
                hideNavBar
              />
            </Stack>
            <Stack key='account_stack' title='個人資料' icon={IconDonut}>
              <Scene
                key='account'
                title='個人資料'
                component={AccountScreen}
                hideNavBar
              />
            </Stack>
            <Stack key='chat_stack' title='聊天' icon={IconChat}>
              <Scene
                key='chat'
                component={ChatScreen}
                title='聊天'
                hideNavBar
              />
            </Stack>
          </Tabs>
        </Stack>
      </Router> */}
    </Fragment>
  );
};

export default InitialScreen;

const styles = StyleSheet.create({
  image: {
    width,
    height,
  },
});
