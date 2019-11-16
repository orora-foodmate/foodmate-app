import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Button as BasicButton, ThemeContext } from "react-native-elements";

const getTextStyle = (color, theme) => ({
  default: {},
  primary: {},
  error: {}
})

const getButtonStyle = (color, theme) => ({
  
})

const Button = props => {
  const { theme } = useContext(ThemeContext);

  const { title, type, color, onPress, titleStyle, buttonStyle } = props;

  const colorStyle = getColors(color, theme);

  return (
    <BasicButton
      type={type}
      title={title}
      onPress={onPress}
      titleStyle={[styles.title, titleStyle]}
      buttonStyle={[styles.button, buttonStyle]}
    />
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center"
  },
  button: {
    width: "80%",
    borderRadius: 50
  }
});

export default Button;
