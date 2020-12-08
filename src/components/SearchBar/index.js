import React from 'react';
import {View, StyleSheet} from 'react-native';
import Button from '~/components/Button';
import TextInputField from '~/components/Inputs/TextInputField';

const SearchBar = ({name, placeholder, value, onSearch, onChangeText}) => {
  return (
    <View style={styles.container}>
      <TextInputField name={name} placeholder={placeholder} value={value} onChangeText={onChangeText} />
      <View style={styles.buttonZone}>
        <Button title='搜尋' onPress={onSearch} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30
  },
  buttonZone: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SearchBar;
