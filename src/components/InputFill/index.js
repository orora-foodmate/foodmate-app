import React, { useContext } from "react";
import propTypes from "prop-types";
import { Input, ThemeContext, Icon } from "react-native-elements";

const InputFill = ({ placeholder, leftIcon, iconName, ...props }) => {
  const {theme} = useContext(ThemeContext);
  return (
    <Input
      placeholder={placeholder}
      containerStyle={{ borderRadius: 25, backgroundColor: "white" }}
      inputContainerStyle={{ borderBottomWidth: 2, borderColor: '#eee', marginBottom: 15 }}
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
