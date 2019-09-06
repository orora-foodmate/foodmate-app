import React, { useContext } from "react";
import propTypes from "prop-types";
import { View } from "react-native";
import { ThemeContext } from "react-native-elements";

const ViewBox = ({ color, children, flex, fill, ...props }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <View
      style={{
        flex: flex ? 1 : 0,
        backgroundColor: theme.colors[color],
        justifyContent: "center",
        alignItems: fill ? "stretch" : "center",
        paddingTop: 44,
        paddingBottom: 20
      }}
      {...props}
    >
      {children}
    </View>
  );
};

ViewBox.propTypes = {
  color: propTypes.string,
  flex: propTypes.bool,
  fill: propTypes.bool
};

export default ViewBox;
