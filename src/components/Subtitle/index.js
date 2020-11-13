import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '~/components/Text';

const Subtitle = ({ title }) => {
  return (
    <View style={styles.subtitle}>
        <Text h4>{title}</Text>
      </View>
  )
}

const styles = StyleSheet.create({
  subtitle: {
    padding: 30,
    paddingBottom: 0
  }
})

export default Subtitle;