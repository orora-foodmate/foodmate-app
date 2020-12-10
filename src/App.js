import React from 'react';
import {Provider} from 'react-redux';
import {ThemeProvider} from 'react-native-elements';
import {NavigationProvider} from 'react-native-navigation-hooks';
import theme from '~/theme';
import store from '~/store/configureStore';
import ScrollContainer from '~/components/ScrollContainer';
import Config from 'react-native-config';
console.log("🚀 ~ file: App.js ~ line 9 ~ Config", Config)


const App = (Component) => (props) => {
  return (
    <ScrollContainer>
      <Provider store={store}>
        <NavigationProvider value={{componentId: props.componentId}}>
          <ThemeProvider theme={theme}>
            <Component {...props} />
          </ThemeProvider>
        </NavigationProvider>
      </Provider>
    </ScrollContainer>
  );
};

export default App;
