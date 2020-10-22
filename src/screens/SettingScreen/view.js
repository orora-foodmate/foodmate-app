import React, { Fragment } from 'react';
import { View } from 'react-native';
import ConfirmButton from '~/components/Button/ConfirmButton';
import { Card } from 'react-native-elements';
import QRCode from 'react-native-qrcode-generator';

const SettingScreen = ({
  auth,
  handleLogout,
}) => {

  return (
    <Fragment>
      <Card>
        <Card.Image source={{ uri: auth.get('avatar') }} resizeMode="cover" />
        <Card.Divider />
        <Card.Title>{auth.get('name')}</Card.Title>
      </Card>
      <ConfirmButton title='Logout' onPress={handleLogout} />
      <View style={{flex: 1, alignItems: 'center'}}>
      <QRCode
        value={auth.get("_id")}
        size={200}
        bgColor='black'
        fgColor='white' />
        </View>
    </Fragment>
  );
};

export default SettingScreen;
