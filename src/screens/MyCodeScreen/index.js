import React from "react";
import { Text, Image } from "react-native-elements";

const userDetail = {
  name: "Wendy",
  id: "1231321546"
};

const MyCodeScreen = () => {
  return (
    <>
      <Text title={userDetail.name} />
      <Text title={"ID:" + userDetail.id} />
      <Image />
    </>
  );
};

export default MyCodeScreen;
