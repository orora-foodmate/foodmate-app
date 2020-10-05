// @flow

import React from 'react';
import { Navigation } from 'react-native-navigation';
import store from '~/store/configureStore';
import theme from '~/theme';
import { ThemeProvider } from 'react-native-elements';
import { Provider } from 'react-redux';
import LoginScreen from '~/screens/LoginScreen';
import HomeScreen from '~/screens/HomeScreen';
import RegisterScreen from '~/screens/RegisterScreen';
import { LOGIN_SCREEN, HOME_SCREEN, REGISTER_SCREEN, INITIAL_SCREEN } from './Screens';
import InitialScreen from '~/screens/InitialScreen';


function WrappedComponent(Component) {
  return function inject(props) {
    const EnhancedComponent = () => (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Component {...props} />
        </ThemeProvider>
      </Provider>
    );

    return <EnhancedComponent />;
  };
}

export default function () {
  Navigation.registerComponent(INITIAL_SCREEN, () => WrappedComponent(InitialScreen));
  Navigation.registerComponent(LOGIN_SCREEN, () => WrappedComponent(LoginScreen));
  Navigation.registerComponent(REGISTER_SCREEN, () => RegisterScreen);
  Navigation.registerComponent(HOME_SCREEN, () => HomeScreen);
  console.info('All screens have been registered...');
}
