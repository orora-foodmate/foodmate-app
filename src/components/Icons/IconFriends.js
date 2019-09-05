import React, { useContext } from "react";
import { Icon, ThemeContext } from "react-native-elements";

const IconFriends = ({ ...props }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <Icon
      type='font-awesome'
      name='users'
      color={props.focused ? theme.colors.primary : theme.colors.grey4}
      {...props}
    />
  );
};

export default IconFriends;
