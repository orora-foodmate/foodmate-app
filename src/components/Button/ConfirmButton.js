import React from 'react';
import { StyleSheet } from 'react-native';
import propTypes from 'prop-types';
import Button from './index';
import theme from '~/theme';

const ConfirmButton = ({ onPress, containerStyle, ...props }) => {

  const styles = StyleSheet.create({
    containerStyle: {
      marginVertical: theme.spacing.middle,
      width: '100%',
    },
    buttonStyle: {
      width: '90%',
      alignSelf: 'center',
    },
    titleStyle: {
      ...theme.Text.h4Style,
    },
  });

  return (
    <Button
      onPress={onPress}
      titleStyle={styles.titleStyle}
      buttonStyle={styles.buttonStyle}
      containerStyle={[styles.containerStyle, containerStyle]}
      {...props}
    />
  );
};

ConfirmButton.propTypes = {
  onPress: propTypes.func.isRequired,
  containerStyle: propTypes.object,
};

ConfirmButton.defaultProps = {
  containerStyle: {},
};

export default ConfirmButton;
