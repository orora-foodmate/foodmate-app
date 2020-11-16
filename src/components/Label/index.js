import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import colors from '~/theme/color';

const DEFAULT_CONTAINER_STYLE = {
  info: {
    backgroundColor: colors.success
  },
  warning: {
    backgroundColor: colors.warning
  },
  error: {
    backgroundColor: colors.error
  }
};

const Label = ({type, text}) => {
  const basicContainerStyle = DEFAULT_CONTAINER_STYLE[type];
  return (
    <View style={[styles.containerStyle, basicContainerStyle]}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

Label.defaultProps = {
  type: 'info'
};

const styles = StyleSheet.create({
  containerStyle: {
    borderRadius: 5, padding: 5
  },
  text: {color: '#fff'}
});
export default Label;
