import React from 'react';
import {Text} from 'react-native';
import reducers, { ReducerContext } from './reducers';
import { ThemeProvider } from 'react-native-elements';
import theme from './theme';
import MainScreen from './screens/MainScreen';
import thunkReducer from './helpers/thunkHelper';

const initState = reducers();
const App = () => {
  const store = thunkReducer(reducers, initState);

  return (
    <ReducerContext.Provider value={store}>
      <ThemeProvider theme={theme}>
        <MainScreen />
      </ThemeProvider>
    </ReducerContext.Provider>
  );
};

export default App;
