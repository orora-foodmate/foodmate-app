import React, { Fragment } from 'react';
import Text from '~/components/Text';
import ConfirmButton from '~/components/Button/ConfirmButton';

const SettingScreen = ({
  handleLogout,
  ...props
}) => {

  const onPress = () => {
    handleLogout();
  };

  return (
    <Fragment>
      <Text h1>Setting Screen</Text>
      <ConfirmButton title='Logout' onPress={onPress}/>
    </Fragment>
  );
};

export default SettingScreen;
