import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import isEmpty from 'lodash/isEmpty';
import cloneDeep from 'lodash/cloneDeep';
import shadow from '../../theme/shadow';
import colors from '../../theme/color';
import Button from '~/components/Button';
import InputImage from '~/components/Inputs/InputImage';
import ScrollContainer from '~/components/ScrollContainer';
import TextInputField from '~/components/Inputs/TextInputField';
import {Avatar, Button as NativeButton} from 'react-native-elements';
import {inputDonut, inputDonutError} from '~/assets/icons';

const DEFAULT_PAYLOAD = {};

const handleOnChange = (setter) => ({target: {name, value}}) => {
  setter({[name]: value});
};

const EditProfileScreen = ({auth}) => {
  const [errors, setErrors] = useState({});
  const [payload, setPayload] = useState(cloneDeep(DEFAULT_PAYLOAD));

  const onChange = handleOnChange(setPayload);

  return (
    <ScrollContainer containerStyle={styles.container}>
      <View style={styles.form}>
        <Avatar
          rounded
          style={styles.avatar}
          source={{uri: auth.get('avatar')}}
        />
         <NativeButton
          title='編輯大頭照'
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
          containerStyle={styles.buttonContainer}
        />
        <TextInputField
          name='name'
          placeholder='请输入暱稱'
          errorMessage={errors.account}
          onChangeText={onChange}
          leftIcon={
            <InputImage
              icon={inputDonut}
              errorIcon={inputDonutError}
              isError={!isEmpty(errors.account)}
            />
          }
        />
      </View>
      <View style={styles.buttonZone}>
        <Button title='儲存' />
        <Button title='返回' type='outline' />
      </View>
    </ScrollContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    display: 'flex',
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  buttonZone: {
    paddingTop: 20,
    alignItems: 'center',
  },  
  avatar: {
    width: 100,
    height: 100,
    borderWidth: 5,
    marginBottom: 20,
    borderRadius: 80,
    borderColor: '#fff',
    backgroundColor: '#fff',
    ...shadow.black,
  },
  buttonTitle: {
    fontSize: 12,
    lineHeight: 10,
    color: colors.grey,
  },
  buttonContainer: {
    margin: 5,
    flex: 1,
  },
  button: {
    borderWidth: 1.5,
    height: 30,
    borderRadius: 5,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
});

export default EditProfileScreen;
