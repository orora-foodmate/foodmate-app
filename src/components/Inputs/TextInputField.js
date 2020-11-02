import React from 'react';
import propTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import isEmpty from 'lodash/isEmpty';
import { StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import theme from '~/theme';

const TextInputField = ({
  placeholder,
  iconName,
  containerStyle,
  inputContainerStyle,
  inputStyle,
  leftIconContainerStyle,
  hidden,
  maxLength,
  placeholderTextColor,
  ...props
}) => {
  const styles = getStyles(theme, props);
  if (hidden) {
    return null;
  }
  return (
    <Input
      autoCapitalize='none'
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor || theme.colors.greyLight}
      labelStyle={styles.label}
      inputStyle={[styles.input, inputStyle]}
      containerStyle={[styles.container, containerStyle]}
      inputContainerStyle={[styles.inputContainer, inputContainerStyle]}
      leftIconContainerStyle={[
        styles.leftIconContainer,
        leftIconContainerStyle,
      ]}
      maxLength={maxLength}
      leftIcon={
        isEmpty(iconName) ? null : (
          <Icon name={iconName} size={24} color={theme.colors.greyLight} />
        )
      }
      errorStyle={styles.errorStyle}
      disabledInputStyle={styles.disabledInputStyle}
      {...props}
    />
  );
};

const getStyles = (theme, props) => {
  return StyleSheet.create({
    container: {
      width: '100%',
      display: 'flex',
      alignItems: 'flex-start',
      flexDirection: 'column',
      paddingTop: theme.spacing.small,
      paddingLeft: 0,
      paddingRight: 0,
    },
    inputContainer: {
      borderBottomWidth: 1,
      borderColor: props.errorMessage
        ? theme.colors.error
        : theme.colors.greyLightest,
    },
    input: {
      color: theme.colors.secondary,
      fontSize: theme.Text.h4Style.fontSize,
    },
    label: {
      fontWeight: theme.fontWeights.medium,
      fontSize: theme.Text.h6Style.fontSize,
      color: props.disabled ? theme.colors.disabled : theme.colors.grey,
    },
    leftIconContainer: {
      paddingRight: theme.spacing.small,
    },
    errorStyle: {
      fontSize: theme.Text.h6Style.fontSize,
    },
    disabledInputStyle: {
      color: theme.colors.disabled,
      opacity: 1,
    },
  });
};

TextInputField.propTypes = {
  placeholder: propTypes.string,
  iconName: propTypes.string,
  ...Input.propTypes,
};

TextInputField.defaultProps = {
  maxLength: 30,
};

export default TextInputField;
