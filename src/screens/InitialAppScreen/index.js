import React, { useContext, useEffect } from 'react';
import { ReducerContext } from '../../reducers';
import { StyleSheet, Dimensions, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';

const { width, height } = Dimensions.get('window');

export default () => {
  const [{ auth, setting }] = useContext(ReducerContext);

  
  useEffect(() => {
    // alert(auth.get('isAuth'))
    if (setting.get('isInitialed')) {
      auth.get('isAuth')
        ? Actions.replace('tabs_bar', { aaa: 'ccc' })
        : Actions.replace('login_stack', { aaa: 'ccc' });
    }
  }, [auth.get('isAuth'), setting.get('isInitialed')]);
  return (
    <Image
      style={styles.image}
      // source={require('../../assets/images/splash.png')}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width,
    height
  }
});
