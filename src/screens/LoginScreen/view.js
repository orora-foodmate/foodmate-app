import React, { Fragment, useRef, useState } from 'react';
import { useNavigation } from 'react-native-navigation-hooks/dist';
import { Icon } from 'react-native-elements';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Button from '~/components/Button';
import PasswordInput from '~/components/Inputs/PasswordInput';
import TextInputField from '~/components/Inputs/TextInputField';
import colors from '~/theme/color';
import { RNCamera } from 'react-native-camera';

const onChange = setter => value => {
  const noSpaceValue = value.trim();
  setter(noSpaceValue);
};

const LoginScreen = ({
  handleLogin,
}) => {
  let cameraRef = useRef(null);
  const [account, setAccount] = useState('horsekit1982@gmail.com');
  const [password, setPassword] = useState('a12345678');  

  const { push } = useNavigation();

  const payload = {
    account,
    password,
    grant_type: 'password',
  };

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const options = { quality: 0.5, base64: false };
        const data = await cameraRef.takePictureAsync(options);
        console.log(data.uri);
      } catch(error) {
      console.log('takePicture -> error', error)

      }      
    }
  };

  const onPress = () => {
    handleLogin(payload);
  }

  return (
    <Fragment>
      <RNCamera
          ref={ref => {
            cameraRef = ref;
          }}
          style={{
            flex: 4,
            justifyContent: 'flex-end',
    alignItems: 'center',

          }}
          // type={RNCamera.Constants.Type.back}
          // flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);

          }}
        />
         <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={takePicture} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> SNAP </Text>
          </TouchableOpacity>
        </View>
    </Fragment>
  );
  return (
    <View style={styles.container}>
      <TextInputField
          // label='用户名'
          placeholder='请输入用户名'
          value={account}
          containerStyle={{ width: 300 }}
          onChangeText={onChange(setAccount)}
          leftIcon={<Icon type='feather' name='user' containerStyle={{ width: 24} } color={colors.black} />}
        />
      <PasswordInput
        value={password}
        containerStyle={{ width: 300 }}
        onChangeText={onChange(setPassword)}
        leftIcon={<Icon type='feather' name='key' containerStyle={{ width: 24} } color={colors.black} />}
      />
      <Button
        buttonStyle={{ width: 300, borderRadius: 25 }}
        title='登入'
        onPress={onPress}
      />
      <Button
        buttonStyle={{ width: 300, borderRadius: 25 }}
        title='註冊'
        onPress={() => push('Registe')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

LoginScreen.options = {
  topBar: {
    title: {
      text: 'LoginScreen'
    }
  },
  bottomTab: {
    text: 'Login'
  }
};

export default LoginScreen;
