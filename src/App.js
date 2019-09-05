import React from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "react-native-elements";
import store from "./store/configureStore";
import AppNavigation from "./navigation/AppNavigation";

const theme = {
  colors: {
    primary: "#FFC657",
    primaryLight: "#FFD98E",
    primaryDark: "#FFAB06",
    secondary: "#55A6E2",
    danger: "#F88383",
    divider: "#EBEBEB",
    grey1: "#F5F5F5",
    grey2: "#EBEBEB",
    grey3: "#B4B4B4",
    grey4: "#707070",
    grey5: "#4C4C4C"
  },
  Avatar: {
    rounded: true
  },
  Button: {
    containerStyle: {
      width: 300,
      margin: 6
    },
    buttonStyle: {
      padding: 8,
      borderRadius: 30,
      backgroundColor: "#FFD98E",
      borderWidth: 1,
      borderColor: "#FFAB06"
    },
    titleStyle: { fontSize: 16, color: "#FFAB06" }
  },
  Input: {
    containerStyle: {
      width: 300
    },
    inputContainerStyle: {
      borderBottomColor: "#F5F5F5"
    },
    leftIconContainerStyle: {
      paddingRight: 10
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

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AppNavigation />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
