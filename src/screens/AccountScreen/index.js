import React from "react";
import { Text } from "react-native";
import Header from "../../components/Header";
import ViewBox from "../../components/ViewBox";

const AccountScreen = props => {
  return (
    <React.Fragment>
      <Header />
      <ViewBox>
        <Text>AccountScreen</Text>
      </ViewBox>
    </React.Fragment>
  );
};

export default AccountScreen;
