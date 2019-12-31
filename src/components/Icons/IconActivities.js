import React from 'react';
import { Image } from 'react-native';

const styles = {
  icon: {
    width: 24,
    height: 24
  }
}

const IconActivities = props => {
  return props.focused ?
    <Image style={styles.icon} source={require("../../assets/icons/tab-activies-active.png")} />
    :
    <Image style={styles.icon} source={require("../../assets/icons/tab-activities-deactive.png")} />
  
}

export default IconActivities;
