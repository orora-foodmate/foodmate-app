// @flow

import { Navigation } from 'react-native-navigation';

import {
  LOGIN_SCREEN,
  INITIAL_SCREEN,
  HOME_SCREEN,
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

// requestUserPermission();
// Register all screens on launch
registerScreens();

export function switchScreen() {
  Navigation.setRoot({
    root: {
      stack: {
        children: [{
          component: {
            name: INITIAL_SCREEN,
            options: {
              topBar: {
                visible: false,
              }
            }
          }
        }]
      }
    }
  });
}

export function publicScreens() {
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


export function privateScreens() {
  Navigation.setRoot({
    root: {
      bottomTabs: {
        children: [{
          stack: {
            children: [{
              component: {
                name: HOME_SCREEN,
                options: {
                  topBar: {
                    title: {
                      text: 'TAB 1'
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
            }],
            options: {
              bottomTab: {
                icon: require('assets/icons/ic_tab_home.png'),
                testID: 'FIRST_TAB_BAR_BUTTON',
                text: 'Tab1',
              }
            }
          }
        },
        {
          stack: {
            children: [{
              component: {
                name: HOME_SCREEN,
                options: {
                  topBar: {
                    title: {
                      text: 'TAB 2'
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
            }],
            options: {
              bottomTab: {
                icon: require('assets/icons/ic_tab_menu.png'),
                testID: 'SECOND_TAB_BAR_BUTTON',
                text: 'Tab2',
              }
            }
          }
        }]
      }
    }
  });
}