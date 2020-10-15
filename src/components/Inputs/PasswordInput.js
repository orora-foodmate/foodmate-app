import React, { Fragment, useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import isEmpty from 'lodash/isEmpty';
import TextInputField from './TextInputField';
import colors from '~/theme/color';

const EyeIcon = ({ showPassword }) => {
  const IconName = showPassword ? 'eye' : 'eye-slash';
  return <Icon name={IconName} style={styles.toogleSize} />;
};

const EyeIconButton = props => {
  const { hidden, showPassword, onEyePress } = props;
  if (hidden) return <Fragment />;

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onEyePress}>
      <View style={styles.toogleBtn}>
        <EyeIcon showPassword={showPassword} />
      </View>
    </TouchableOpacity>
  );
};

const PasswordInput = props => {
  const { value, errorMessage } = props;
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View>
      <TextInputField
        // label='登录密码'
        placeholder='请输入登录密码'
        maxLength={20}
        secureTextEntry={!showPassword}
        defaultValue={value}
        rightIcon={
          <EyeIconButton
            hidden={isEmpty(value)}
            showPassword={showPassword}
            onEyePress={() => setShowPassword(!showPassword)}
          />
        }
        errorMessage={errorMessage}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  toogleBtn: {
    padding: 10,
    color: colors.black,
  },
  toogleSize: {
    fontSize: 16,
  },
});

export default PasswordInput;
