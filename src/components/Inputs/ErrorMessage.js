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
    height: 20
  },
  text: {
    color: colors.error
  }
})

export default ErrorMessage;
