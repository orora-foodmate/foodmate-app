import React from "react";
import propTypes from "prop-types";
import { ListItem } from "react-native-elements";

const ListItemSwitch = ({ title, value, setValue, ...props }) => {
  return (
    <ListItem
      title={title}
      switch={{ value, onValueChange: setValue }}
      bottomDivider
      {...props}
    />
  );
};

ListItemSwitch.propTypes = {
  title: propTypes.string,
  value: propTypes.bool,
  setValue: propTypes.func
};

export default ListItemSwitch;
