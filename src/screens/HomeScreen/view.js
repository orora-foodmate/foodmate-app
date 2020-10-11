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
    console.log("HomeScreen -> useEffect -> friendQuery", props.friendQuery)
    const sub = props.friendQuery.$.subscribe(friends => {
    console.log("HomeScreen -> friends", friends)
    })
    props.handleGetFriends();

    return () => {
      sub.unsubscribe();
    }
  }, []);

  return (
    <Fragment>
      <Text h1>Home Screen</Text>
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
