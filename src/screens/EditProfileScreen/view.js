import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import cloneDeep from 'lodash/cloneDeep';
import ScrollContainer from '~/components/ScrollContainer';
import TextInputField from '~/components/Inputs/TextInputField';

const DEFAULT_PAYLOAD = {};

const handleOnChange = (setter) => ({target: {name, value}}) => {
  setter({[name]: value});
};

const EditProfileScreen = (props) => {
  const [payload, setPayload] = useState(cloneDeep(DEFAULT_PAYLOAD));

  const onChange = handleOnChange(setPayload);

  return (
    <View></View>
    // <ScrollContainer style={styles.container}>
    //     <TextInputField name='name' placeholder='请输入暱稱' onChange={onChange} />
    // </ScrollContainer>
  );
};

const styles = StyleSheet.create({
  form: {
    display: 'flex',
    width: 300,
    backgroundColor: '#000'
  },
});

export default EditProfileScreen;
