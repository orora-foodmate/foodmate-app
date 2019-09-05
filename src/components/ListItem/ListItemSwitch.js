import React from "react";
import propTypes from "prop-types";
import { ListItem } from "react-native-elements";

const ListItemSwitch = ({ title, value, ...props }) => {
  return <ListItem title={title} switch={{ value }} bottomDivider {...props} />;
};

ListItemSwitch.propTypes = {
  title: propTypes.string,
  value: propTypes.bool
};

export default ListItemSwitch;
