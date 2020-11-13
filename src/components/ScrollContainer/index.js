import React from 'react';
import propTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const ScrollContainer = ({children, containerStyle, ...props}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <KeyboardAwareScrollView {...props}>{children}</KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
  },
});

ScrollContainer.propTypes = {
  containerStyle: propTypes.object,
}

ScrollContainer.defaultProps = {
  containerStyle: {}
}

export default ScrollContainer;
