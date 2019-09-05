import React, { useContext } from "react";
import { Icon, ThemeContext } from "react-native-elements";

const IconAccount = ({ ...props }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <Icon
      type='font-awesome'
      name='user-circle'
      color={props.focused ? theme.colors.primary : theme.colors.grey4}
      {...props}
    />
  );
};

export default IconAccount;
