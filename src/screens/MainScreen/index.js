import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Dimensions, Image, View } from 'react-native';
import { ReducerContext } from '../../reducers';
import initialPromise from './actionPromises/initialPromises';
import {
  Scene,
  Router,
  Stack,
} from 'react-native-router-flux';
import AppScreen from '../AppScreen';
import LoginScreen from '../LoginScreen';
import RegisterScreen from '../RegisteScreen';

const { width, height } = Dimensions.get('window');

const MainScreen = props => {
  const [isInitialApp, setIsInitialApp] = useState(false);
  const [{ auth }] = useContext(ReducerContext);

  useEffect(() => {
    initialPromise(setIsInitialApp);
  }, [setIsInitialApp]);

  if (!isInitialApp) {
    return (
      <Image
        style={styles.image}
        source={require('../../assets/images/splash.png')}
      />
    );
  }

  const stateHandler = (prevState, newState, action) => {
    console.log('onStateChange: ACTION:', action);
  };

  return (
    <Router stateHandler={stateHandler}>
      <Scene key='root' hideNavBar>
        <Stack key='login_stack'>
          <Scene key='login' component={LoginScreen} title='Login' hideNavBar />
          <Scene key='register' component={RegisterScreen} title='Register' />
        </Stack>
        <Stack key='app_stack' tabs>
          <Scene key='home' component={AppScreen} />
          <Scene key='test' component={RegisterScreen} title='Test' />
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
