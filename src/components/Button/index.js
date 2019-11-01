import React, { useContext } from 'react';
import { StyleSheet } from "react-native";
import { Button as BasicButton, ThemeContext } from 'react-native-elements';

const Button = props => {

  // const { theme } = useContext(ThemeContext);

  const {
    title,
    color,
    onPress,
    titleStyle,
    buttonStyle
  } = props;

  return (
    <BasicButton
      title={title}
      onPress={onPress}
      titleStyle={titleStyle}
      buttonStyle={[styles.button, buttonStyle]}
    />
  )
}

const styles = StyleSheet.create({
  button: {
    width: '80%',
    borderRadius: 50
  }
})

export default Button;
