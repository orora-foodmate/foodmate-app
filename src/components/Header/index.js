import React from "react";
import { Image } from "react-native";
import { Header as BasicHeader } from "react-native-elements";

const styles = {
  logo: {}
};

const Header = props => {
  return (
    <BasicHeader
      containerStyle={{
        backgroundColor: "#fff"
      }}
      centerComponent={
        <Image
          style={styles.logo}
          source={require("../../assets/images/logo-whitout-underline.png")}
        />
      }
    />
  );
};

export default Header;
