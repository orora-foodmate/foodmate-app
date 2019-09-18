import React, { useContext, useEffect } from "react";
import { Avatar, Button, Text, withTheme } from "react-native-elements";

const styles = {
  
}

const Button = ({}) => (
  <Button
    title='登录'
    buttonStyle={{ marginTop: 24 }}
    titleStyle={{ fontSize: 20 }}
    onPress={handleLogin}
  />
);
