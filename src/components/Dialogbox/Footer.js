import React from 'react';
import propTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { View, TouchableHighlight, StyleSheet } from "react-native";
import {Text, Button} from 'react-native-elements';

const BUTTON_TEXT = {
  warning: '刷新',
  update: '更新',
  confirm: '确认',
  logout: '确认',
  ask: '确认'
}

const SingleButton = ({ type, onConfirm }) => {
  const buttonText = BUTTON_TEXT[type];

  return (
    <View style={styles.dialogFooter}>
      <Button
        containerStyle={styles.btnSecondary}
        titleStyle={styles.btnSecondaryText}
        onPress={onConfirm}
        title={buttonText}
        type="clear"
      />
    </View>
  )
}

const DoubleButton = ({ confirmText, type, onConfirm, onCancel }) => {
  const buttonText = !isEmpty(confirmText)
    ? confirmText
    : BUTTON_TEXT[type];

  return (
    <View style={styles.dialogFooter}>
      <Button
        containerStyle={styles.btnSecondary}
        titleStyle={styles.btnSecondaryText}
        onPress={onCancel}
        title='取消'
        type="clear"
      />
      <Button
        containerStyle={styles.btnSecondary}
        titleStyle={styles.btnSecondaryText}
        onPress={onConfirm}
        title={buttonText}
        type="clear"
      />
    </View>
  )
}

renderFooterType = ({ type, confirmText, onConfirm, onCancel }) => {
  if (type === 'ask') {
    return (
      <DoubleButton
        type={type}
        confirmText={confirmText}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    )
  } else {
    return (
      <SingleButton
        type={type}
        onConfirm={onConfirm}
      />
    )
  }
}

const Footer = props => {
  return (
    <View style={styles.dialogFooter}>
      {this.renderFooterType(props)}
    </View>
  )
};

Footer.prototype = {
  type: propTypes.string.isRequired,
  onConfirm: propTypes.func.isRequired
}

export default Footer;

const styles = StyleSheet.create({
  dialogFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderTopWidth: 0.5,
    borderTopColor: '#e5e5e5'
  },
  btnPrimary: {
    flex: 1,
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4
  },
  btnPrimaryText: {
    color: '#4869ee',
    textAlign: 'center',
    fontSize: 16
  },
  btnSecondary: {
    flex: 1,
  },
  btnSecondaryText: {
    color: '#4869ee',
    textAlign: 'center',
    fontSize: 16
  }
});
