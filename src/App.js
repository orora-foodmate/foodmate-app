import React from 'react';
import { Provider } from 'react-redux';
import RootNavigationContainer from './containers/RootNavigationContainer';
import { ThemeProvider } from 'react-native-elements';
import store from './store/configureStore';
import theme from './theme';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RootNavigationContainer />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
