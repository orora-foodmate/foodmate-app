import React, { Fragment } from 'react';
import ConfirmButton from '~/components/Button/ConfirmButton';
import { Card } from 'react-native-elements';

const SettingScreen = ({
  auth,
  handleLogout,
}) => {
  const onPress = () => {
    handleLogout();
  };

  return (
    <Fragment>
      <Card>
        <Card.Image source={{uri: auth.get('avatar')}} resizeMode="cover"/>
        <Card.Divider />
        <Card.Title>{auth.get('name')}</Card.Title>
      </Card>
      <ConfirmButton title='Logout' onPress={onPress} />
    </Fragment>
  );
};

export default SettingScreen;
