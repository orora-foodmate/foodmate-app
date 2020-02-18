import React, { useContext } from "react";
import propTypes from "prop-types";
import { ListItem, Icon, ThemeContext } from "react-native-elements";

const ListItemLink = ({ title, icon, color, small, ...props }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <ListItem
      title={title}
      titleStyle={{ color: theme.colors[color], fontSize: small ? 14 : 16 }}
      rightIcon={
        icon ? (
          <Icon type='font-awesome' name='angle-right' color={theme.colors.grey3} />
        ) : null
      }
      bottomDivider
      {...props}
    />
  );
};

ListItemLink.propTypes = {
  title: propTypes.string,
  color: propTypes.string,
  icon: propTypes.bool,
  small: propTypes.bool
};

ListItemLink.default = {
  color: 'grey4'
}

export default ListItemLink;
