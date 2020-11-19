import React, { Fragment } from 'react';
import {View, Text, StyleSheet } from 'react-native';
import isEmpty from 'lodash/isEmpty';
import colors from '~/theme/color';

const ErrorMessage = ({ errorMessage }) => {
  if(isEmpty(errorMessage)) return <Fragment />

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{errorMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 20,
    width: '100%',
  },
  text: {
    width: '100%',
    textAlign: 'left',
    paddingTop: 5,
    paddingLeft: 5,
    fontWeight: '800',
    color: colors.error,
  }
})

export default ErrorMessage;
