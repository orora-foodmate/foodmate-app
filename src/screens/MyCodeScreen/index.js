import React from "react";
import { Text, Image } from "react-native-elements";
import { ActivityIndicator } from "react-native";
import ViewBox from "../../components/ViewBox";

const userDetail = {
  name: "Wendy",
  id: "1231321546"
};

const MyCodeScreen = () => {
  return (
    <ViewBox>
      <Text>{userDetail.name}</Text>
      <Text h4>ID: {userDetail.id}</Text>
      <Image
        source={require("../../assets/images/qrcode.png")}
        style={{
          width: 300,
          height: 300,
          marginTop: 20
        }}
        placeholderStyle={{ backgroundColor: "white" }}
        PlaceholderContent={<ActivityIndicator size='large' />}
      />
    </ViewBox>
  );
};

export default MyCodeScreen;
