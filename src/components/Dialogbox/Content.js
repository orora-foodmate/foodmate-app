import React from 'react';
import propTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { Text, Icon } from 'react-native-elements';

const Content = ({ hasIcon, iconName, iconType, descript }) => (
  <View style={styles.dialogBody}>
    {hasIcon && <Icon raised name={iconName} type={iconType} size={40} />}
    <Text style={styles.dialogText}>{descript}</Text>
  </View>
);

Content.propTypes = {
  descript: propTypes.string.isRequired,
  hasIcon: propTypes.bool,
  iconName: propTypes.string,
  iconType: propTypes.oneOf([
    '',
    'font-awesome',
    'material',
    'ionicon',
    'foundation',
    'zocial',
    'feather',
    'antdesign'
  ])
};

Content.defaultProps = {
  hasIcon: false,
  iconName: '',
  iconType: ''
};

export default Content;

const styles = StyleSheet.create({
  dialogBody: {
    justifyContent: 'center',
    padding: 30
  },
  dialogText: {
    fontSize: 16,
    color: '#353132',
    textAlign: 'center',
    lineHeight: 30
  }
});
