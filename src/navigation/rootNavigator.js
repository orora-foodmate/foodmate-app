
import Feather from 'react-native-vector-icons/Feather';
import { Navigation } from 'react-native-navigation';
import colors from '~/theme/color';
import { stack } from './stack';

Feather.loadFont();

const rootNavigator = () => {
  // console.log("rootNavigator -> rootNavigator")
  // Promise.all([
  //   Feather.getImageSource('send', 25),
  //   Feather.getImageSource('users', 25),
  //   Feather.getImageSource('settings', 25),
  // ]).then(([sendIcon, usersIcon, settingIcon]) => {
    Navigation.setDefaultOptions({
      statusBar: {
        backgroundColor: colors.primary,
      },
      topBar: {
        title: {
          color: 'white'
        },
        backButton: {
          color: 'white'
        },
        background: {
          color: colors.primary,
        }
      },
      bottomTab: {
        fontSize: 14,
        selectedFontSize: 18,
        selectedIconColor: colors.primary,
        selectedTextColor: colors.primary,
      }
    });
    
    Navigation.setRoot({
      root: {
        sideMenu: {
          left: {
            component: { name: 'Message' }
          },
          center: {
            bottomTabs: {
              options: {
                bottomTabs: {
                  titleDisplayMode: 'alwaysShow',
                },
              },
              children: [
                stack('Message', 'Message', () => <Feather name='send' size={25} />),
                stack('Friend', 'Friend', () => <Feather name='users' size={25} />),
                stack('Setting', 'Setting', () => <Feather name='setting' size={25} />),
              ]
            },
          },
          options: {
            bottomTab: {
              text: 'SideMenu',
              testID: 'SIDE_MENU_TAB'
            }
          }
        },
      }
    });
  // });
};

export default rootNavigator;