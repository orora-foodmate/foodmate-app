import React, { Fragment, useEffect } from 'react';
import { useNavigation } from 'react-native-navigation-hooks'
import ConfirmButton from '~/components/Button/ConfirmButton';
import Text from '~/components/Text';

const HomeScreen = (props) => {
  const {
    setStackRoot,
    push,
    // pop,
    // showOverlay,
    showModal
  } = useNavigation();

  useEffect(()=>{
    //
  }, []);

  return (
    <Fragment>
      <Text h1>Home Screen</Text>
      <ConfirmButton title='set Other' onPress={()=> setStackRoot('Other')}/>
      <ConfirmButton title='push' onPress={()=> push('Other')}/>
      <ConfirmButton title='showModal' onPress={()=> showModal('Other')}/>
    </Fragment>
  );
}

HomeScreen.options = {
  topBar: {
    title: {
      text: 'Homett',
    },
  },
  bottomTab: {
    text: 'Homebt'
  }
};

export default HomeScreen;
