import React from 'react';
import {Provider} from 'react-redux';
import {ThemeProvider} from 'react-native-elements';
import {NavigationProvider} from 'react-native-navigation-hooks';
import theme from '~/theme';
import store from '~/store/configureStore';
import ScrollContainer from '~/components/ScrollContainer';

const App = (Component) => (props) => {
  return (
      <Provider store={store}>
        <NavigationProvider value={{componentId: props.componentId}}>
          <ThemeProvider theme={theme}>
            <Component {...props} />
          </ThemeProvider>
        </NavigationProvider>
      </Provider>
  );
};

export default App;
