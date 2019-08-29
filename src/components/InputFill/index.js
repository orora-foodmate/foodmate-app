import React from "react";
import propTypes from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, withTheme } from "react-native-elements";

const InputFill = ({ placeholder, iconName, ...props }) => {
  const { theme } = props;
  return (
    <Input
      placeholder={placeholder}
      containerStyle={{ borderRadius: 25, backgroundColor: "white" }}
      inputContainerStyle={{ borderBottomWidth: 0 }}
      leftIconContainerStyle={{ paddingRight: 12 }}
      leftIcon={
        iconName ? (
          <Icon name={iconName} size={24} color={theme.colors.grey3} />
        ) : null
      }
      {...props}
    />
  );
};

InputFill.propTypes = {
  placeholder: propTypes.string
};

export default withTheme(InputFill);
