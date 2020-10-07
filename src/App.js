import React from 'react';
import { Provider } from 'react-redux';
import store from './store/configureStore';
import { NavigationProvider } from 'react-native-navigation-hooks'
import InitManagerItem from '~/screens/InitManagerItem';

const App = (Component) => props => (
  <Provider store={store} >
    <InitManagerItem/>
    <NavigationProvider value={{ componentId: props.componentId }} >
      <Component {...props} />
    </NavigationProvider>
  </Provider>
);

export default App;
