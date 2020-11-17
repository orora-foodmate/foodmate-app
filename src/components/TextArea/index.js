import React from 'react';
import propTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import {Input} from 'react-native-elements';
import colors from '~/theme/color';

const TextArea = ({containerStyle, inputStyle, title, ...props}) => {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <Input
        multiline
        inputContainerStyle={[styles.container, containerStyle]}
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
  title: {
    textAlign: 'center',
    padding: 15
  }
});

export default TextArea;
