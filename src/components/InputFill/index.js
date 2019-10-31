import React, { useContext } from "react";
import propTypes from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, ThemeContext } from "react-native-elements";

const InputFill = ({ placeholder, iconName, ...props }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <Input
      placeholder={placeholder}
      containerStyle={{ borderRadius: 25, backgroundColor: "white" }}
      inputContainerStyle={{ borderBottomWidth: 0 }}
      leftIconContainerStyle={{ paddingRight: 12 }}
      leftIcon={
        iconName ? (
          <Icon type="font-awesome" name={iconName} size={24} color={theme.colors.grey3} />
        ) : null
      }
      {...props}
    />
  );
};

InputFill.propTypes = {
  placeholder: propTypes.string,
  iconName: propTypes.string
};

export default InputFill;
