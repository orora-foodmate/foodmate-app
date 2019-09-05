import React, { useContext } from "react";
import { Icon, ThemeContext } from "react-native-elements";

const IconChat = ({ ...props }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <Icon
      type='ionicon'
      name='ios-chatboxes'
      color={props.focused ? theme.colors.primary : theme.colors.grey4}
      {...props}
    />
  );
};

export default IconChat;
