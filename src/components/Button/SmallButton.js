import React from 'react';
import { StyleSheet } from 'react-native';
import propTypes from 'prop-types';
import Button from './index';
import theme from '~/theme';

const SmallButton = ({ onPress, ...props }) => {
  const styles = getStyles(theme);

  return (
    <Button
      onPress={onPress}
      titleStyle={styles.titleStyle}
      buttonStyle={styles.buttonStyle}
      {...props}
    />
  );
};

SmallButton.propTypes = {
  onPress: propTypes.func.isRequired,
};

export default SmallButton;

const getStyles = theme => {
  return StyleSheet.create({
    buttonStyle: {
      height: 'auto',
      paddingTop: theme.spacing.empty,
      paddingBottom: theme.spacing.empty,
      paddingLeft: theme.spacing.small,
      paddingRight: theme.spacing.small,
      borderWidth: 1,
    },
    titleStyle: {
      ...theme.Text.h6Style,
    },
  });
};
