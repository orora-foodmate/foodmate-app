import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Description = ({content}) => {
  return (
    <View style={styles.description}>
      <Text h5>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  description: {
    padding: 30,
    paddingTop: 20,
    paddingBottom: 0,
  },
});

export default Description;
