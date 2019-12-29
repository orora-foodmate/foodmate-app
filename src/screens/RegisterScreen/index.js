import React, { Fragment } from 'react';
import { KeyboardAvoidingView, View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-elements';
import ViewBox from '../../components/ViewBox';
import InputFill from '../../components/InputFill';
import { Actions } from 'react-native-router-flux';
import reducers, { initialState } from './reducers';
import { makeLocalReducer } from '../../helpers/thunkHelper';
import { updateStateAction } from './actions';

const handleUpdateState = (dispatch, key) => (value) =>
  dispatch(updateStateAction({key, value}))

const handleCreateUser = (dispatch, state) => () => {
  dispatch();
}
const RegisterScreen = (props) => {
  const [state, dispatch] = makeLocalReducer(reducers, initialState, undefined, 'register-screen');
  
  return (
    <ViewBox color='grey1' flex>
      <KeyboardAvoidingView style={styles.content} behavior="padding" enabled>
        <InputFill
          type="number"
          placeholder='手機號碼'
          iconName='dot-circle-o'
          value={state.phone}
          onChangeText={handleUpdateState(dispatch, 'phone')}
        />
        <InputFill
          placeholder='密碼'
          autoCapitalize="none"
          iconName='lock'
          value={state.password}
          onChangeText={handleUpdateState(dispatch, 'password')}
        />
        <InputFill
          placeholder='確認密碼'
          autoCapitalize="none"
          iconName='lock'
          value={state.confirmPassword}
          onChangeText={handleUpdateState(dispatch, 'confirmPassword')}
        />
        <InputFill
          autoCapitalize="none"
          placeholder='Email'
          iconName='lock'
          value={state.email}
          onChangeText={handleUpdateState(dispatch, 'email')}
        />
        <Button
          title='開始交朋友吧'
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
          onPress={() => Actions.pop({})}
        />
        <Button
          type='clear'
          title='返回'
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
          onPress={() => Actions.pop()}
        />
      </KeyboardAvoidingView>
    </ViewBox>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 300,
    marginTop: 24
  },
  buttonTitle: {
    fontSize: 20
  },
  content: {
    paddingTop: 80,
    alignItems: 'center'
  }
});

export default RegisterScreen;
