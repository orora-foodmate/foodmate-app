import React, { useContext } from "react";
import { Icon, ThemeContext } from "react-native-elements";

const IconAt = ({ ...props }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <Icon
      type='ionicon'
      name='md-at'
      color={theme.colors.primary}
      {...props}
    />
  );
};

export default IconAt;
