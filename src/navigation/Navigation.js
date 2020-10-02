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
    const defaultAppMessaging = await messaging();
    console.log("requestUserPermission -> defaultAppMessaging", defaultAppMessaging)
    
    console.log("requestUserPermission -> token", token)
    const authStatus = await defaultAppMessaging.requestPermission();
    console.log("requestUserPermission -> authStatus", authStatus)
    const token = await defaultAppMessaging.getToken();
      console.log('Authorization authStatus:', authStatus);
  }catch(error) {
  console.log("requestUserPermission -> error", error)
    
  }
  
}

// var config = {
//   apiKey: "xxxxxxxxxxxxxxxxxxxxxxxx",
//   authDomain: 'https://xxxxxxxxx.firebaseapp.com/',
//   databaseURL: 'https://xxxxxxxxx.firebaseio.com',
//   messagingSenderId: 'xxxxxxxxxx',
//   debug: true
// }

requestUserPermission();
// Register all screens on launch
registerScreens();

export function pushSingleScreenApp() {
  Navigation.setRoot({
    root: {
      stack: {
        children: [{
          component: {
            name: REGISTER_SCREEN,
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