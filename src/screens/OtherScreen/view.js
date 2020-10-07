import React, { Fragment } from 'react';
import { useNavigation } from 'react-native-navigation-hooks'
import ConfirmButton from '~/components/Button/ConfirmButton';
import Text from '~/components/Text';

const OtherScreen = props => {
  const { setStackRoot } = useNavigation();

  return (
    <Fragment>
      <Text h1>Other Screen</Text>
      <ConfirmButton title='go to Home' onPress={()=> setStackRoot('Home')}/>
    </Fragment>
  );
};

export default OtherScreen;
