import React from 'react';
import { Provider } from 'react-redux';
import RootNavigationContainer from './containers/RootNavigationContainer';
import { ThemeProvider } from 'react-native-elements';
import store from './store/configureStore';
import theme from './theme';
import socketClusterClient from 'socketcluster-client';

let socket = socketClusterClient.create({
  hostname: 'localhost',
  port: 8000
});

// setTimeout(() => {
//   socket.transmit('customRemoteEvent', 123);
// }, 60000)


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
