import React, { useContext } from "react";
import propTypes from "prop-types";
import { Input, ThemeContext } from "react-native-elements";

const InputFill = ({ placeholder, leftIcon, ...props }) => {
  return (
    <Input
      placeholder={placeholder}
      containerStyle={{
        backgroundColor: "#fff",
        marginBottom: 15,
        width: "100%"
      }}
      inputContainerStyle={{
        borderBottomWidth: 2,
        width: "100%",
        borderColor: "#eee",
        fontSize: 10
      }}
      leftIcon={leftIcon}
      leftIconContainerStyle={{ paddingRight: 12, paddingLeft: 0 }}
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
