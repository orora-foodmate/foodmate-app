import React, { useEffect } from 'react';
import reducers, { ReducerContext } from './reducers';
import { ThemeProvider } from 'react-native-elements';
import theme from './theme';
import MainScreen from './screens/MainScreen';
import thunkReducer, { globalDispatcher } from './helpers/thunkHelper';
import { initialAppAction } from './appActions';

const initState = reducers();

const App = () => {
  const [store, dispatch] = thunkReducer(reducers, initState);

  useEffect(() => {
    globalDispatcher.setDispatch(dispatch);
    dispatch(initialAppAction());
  }, []);

  return (
    <ReducerContext.Provider value={[store, dispatch]}>
      <ThemeProvider theme={theme}>
        <MainScreen />
      </ThemeProvider>
    </ReducerContext.Provider>
  );
};

export default App;
