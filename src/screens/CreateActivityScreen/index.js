import React from "react";
import { Text } from "react-native";
import Header from "../../components/Header";
import ViewBox from "../../components/ViewBox";

const CreateActivityScreen = props => {
  return (
    <React.Fragment>
      <Header />
      <ViewBox>
        <Text>CreateActivityScreen</Text>
      </ViewBox>
    </React.Fragment>
  );
};

export default CreateActivityScreen;
