import React from 'react';
import { Image } from 'react-native';

const styles = {
  icon: {
    width: 30,
    height: 25
  }
}

const IconChat = props => {
  return props.focused ?
    <Image style={styles.icon} source={require("../../assets/icons/tab-chat-active.png")} />
    :
    <Image style={styles.icon} source={require("../../assets/icons/tab-chat-deactive.png")} />
  
}

export default IconChat;
