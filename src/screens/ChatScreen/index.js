import React from "react";
import { Text } from "react-native";
import Header from "../../components/Header";
import ViewBox from "../../components/ViewBox";

const ChatScreen = props => {
  return (
    <React.Fragment>
      <Header />
      <ViewBox>
        <Text>ChatScreen</Text>
      </ViewBox>
    </React.Fragment>
  );
};

export default ChatScreen;
