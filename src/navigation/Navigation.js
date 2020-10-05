// @flow

import { Navigation } from 'react-native-navigation';
import firebase from '@react-native-firebase/app';

import {
  LOGIN_SCREEN,
  REGISTER_SCREEN,
} from './Screens';
import registerScreens from './registerScreens';
import messaging from '@react-native-firebase/messaging';

async function requestUserPermission() {
  try {
    const messageinstance = messaging();
    const authStatus = await messageinstance.requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      await messageinstance.registerDeviceForRemoteMessages();
      const token = await messageinstance.getToken();
      console.log('token:', token);
    }
  } catch(error) {
  console.log("requestUserPermission -> error", error)
  }
}

requestUserPermission();
// Register all screens on launch
registerScreens();

export function pushSingleScreenApp() {
  Navigation.setRoot({
    root: {
      stack: {
        children: [{
          component: {
            name: LOGIN_SCREEN,
            options: {
              topBar: {
                title: {
                  text: 'SINGLE SCREEN APP'
                },
                leftButtons: [
                  {
                    id: 'nav_user_btn',
                    icon: require('assets/icons/ic_nav_user.png'),
                    color: 'white'
                  }
                ],
                rightButtons: [
                  {
                    id: 'nav_logout_btn',
                    icon: require('assets/icons/ic_nav_logout.png'),
                    color: 'white'
                  }
                ]
              }
            }
          }
        }]
      }
    }
  });
}