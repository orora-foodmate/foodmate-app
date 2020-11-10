import React from 'react';
import { View, Image } from 'react-native';
import logo from '~/assets/images/logo-whitout-underline.png'

const TopBar = props => {
  return (
    <View>
      <Image source={logo} style={{ width: 150, height: 25, resizeMode: 'contain'}}/>
    </View>
  )
}

export default TopBar;
