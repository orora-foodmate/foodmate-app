import React from "react";
import { Button } from "react-native-elements";

const ButtonSmall = ({ ...props }) => {
  return (
    <Button
    buttonStyle={{ padding: 4, paddingHorizontal: 16, margin: 6}}
    titleStyle={{ fontSize: 14}}
      {...props}
    />
  );
};

export default ButtonSmall;
