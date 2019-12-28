import React, { useContext } from "react";
import propTypes from "prop-types";
import { Input, ThemeContext } from "react-native-elements";

const InputFill = ({ placeholder, leftIcon, iconName, ...props }) => {
  return (
    <Input
      placeholder={placeholder}
      containerStyle={{ borderRadius: 25, backgroundColor: "white" }}
      inputContainerStyle={{ borderBottomWidth: 0 }}
      leftIconContainerStyle={{ paddingRight: 12 }}
      leftIcon={leftIcon}
      iconName={
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
  leftIcon: propTypes.element
};

InputFill.defaultProps = {
  leftIcon: null
};

export default InputFill;
