import React from "react";
import { Text } from "react-native";
import Header from "../../components/Header";
import ViewBox from "../../components/ViewBox";

const HomeScreen = props => {
  return (
    <React.Fragment>
      <Header />
      <ViewBox>
        <Text>Home</Text>
      </ViewBox>
    </React.Fragment>
  );
};

export default HomeScreen;
