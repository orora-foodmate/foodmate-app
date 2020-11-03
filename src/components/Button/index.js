import React from 'react';
import { StyleSheet } from 'react-native';
import { Button as BaseButton } from 'react-native-elements';
import propTypes from 'prop-types';
import colors from '~/theme/color';

class Button extends React.PureComponent {
  static propTypes = {
    onPress: propTypes.func.isRequired,
    ...Button.propTypes,
  };

  static defaultProps = {
    isVisible: true,
    type: 'solid',
  };

  render() {
    const { isVisible, onPress, type, ...props } = this.props;
    if (!isVisible) return null;
    const styles = getStyles(type);
    return (
      <BaseButton
        {...props}
        type={type}
        onPress={onPress}
        disabledStyle={styles.disabledStyle}
        disabledTitleStyle={styles.disabledTitleStyle}
        buttonStyle={[styles.buttonStyle, props.buttonStyle]}
      />
    );
  }
}

export default Button;

const getStyles = type => {
  const disabledColor = colors.greyLighter;
  return StyleSheet.create({
    disabledStyle: {
      backgroundColor: type === 'solid' ? disabledColor : colors.transparent,
      borderColor: type === 'outline' ? disabledColor : colors.transparent,
    },
    disabledTitleStyle: {
      color: type === 'solid' ? colors.white : disabledColor,
    },
    buttonStyle: {
      width: 230,
      height: 36,
      borderRadius: 25,
    }
  });
};
