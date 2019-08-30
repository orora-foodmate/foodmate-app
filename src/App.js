import React from "react";
import { ThemeProvider } from "react-native-elements";
import MainScreen from "./screens/MainScreen";
import reducers, { ReducerContext } from "./reducers";
import thunkReducer from "./helpers/thunkHelper";

const theme = {
  colors: {
    primary: "#19C616",
    primaryLight: "#63DB41",
    primaryDark: "#10B20E",
    secondary: "#4BA4EA",
    secondaryLight: "#7BC5FF",
    secondaryDark: "#3C94D9",
    success: "#7FE910",
    warning: "#F69900",
    danger: "#C80A0A",
    divider: "#EFEFEF",
    yellow: "#F4B934",
    pink: "#F22B7B",
    purple: "#9936F9",
    purpleBlue: "#6051F9",
    blue: "#0077FF",
    grey1: "#F6F6F6",
    grey2: "#E4E4E4",
    grey3: "#BEBEBE",
    grey4: "#4C4C4C"
  },
  Avatar: {
    rounded: true
  },
  Button: {
    buttonStyle: { width: 300, padding: 8, margin: 6, borderRadius: 6 },
    titleStyle: { fontSize: 16 }
  },
  Input: {
    containerStyle: {
      width: 300
    }
  },
  SearchBar: {
    containerStyle: {
      padding: 0,
      backgroundColor: "transparent",
      borderTopColor: "transparent",
      borderBottomColor: "transparent"
    },
    inputContainerStyle: {
      borderRadius: 25,
      backgroundColor: "white"
    },
    searchIcon: {
      size: 24
    },
    leftIconContainerStyle: {
      paddingLeft: 12,
      paddingRight: 0
    }
  }
};

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
