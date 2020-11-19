import React from 'react';
import propTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import {StyleSheet, Text, View} from 'react-native';
import {Input} from 'react-native-elements';
import colors from '~/theme/color';

const TextArea = ({containerStyle, inputStyle, title, errorMessage, ...props}) => {

  const errorStyle = !isEmpty(errorMessage) ? styles.errorStyle: {};

  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <Input
        multiline
        errorMessage={errorMessage}
        inputContainerStyle={[styles.container, containerStyle, errorStyle]}
        {...props}
      />
    </View>
  );
};

TextArea.propTypes = {
  title: propTypes.string,
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'baseline',
    height: 80,
    padding: 15,
    paddingTop: 10,
    borderWidth: 2,
    borderColor: colors.greyLightest,
    borderRadius: 5,
    borderBottomWidth: 2,
  },
  errorStyle: {
    borderColor: colors.error
  },  
  title: {
    textAlign: 'center',
    padding: 15,
    color: colors.grey
  }
});

export default TextArea;
