import React from 'react';
import { Image } from 'react-native';

const styles = {
  icon: {
    width: 25,
    height: 25
  }
}

const IconDonut = props => {
  return props.focused ?
    <Image style={styles.icon} source={require("../../assets/icons/tab-profile-active.png")} />
    :
    <Image style={styles.icon} source={require("../../assets/icons/tab-profile-deactive.png")} />
  
}

export default IconDonut;
