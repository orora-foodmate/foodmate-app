import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Navigation} from 'react-native-navigation';
import colors from '~/theme/color';
import {stack} from './stack';

const rootNavigator = () => {
  Promise.all([
    MaterialIcons.getImageSource('add-circle', 25),
    MaterialIcons.getImageSource('forum', 25),
    MaterialIcons.getImageSource('person-pin', 25),
    MaterialIcons.getImageSource('settings', 25),
  ]).then(
    ([
      createIcon,
      chatIcon,
      usersIcon,
      settingIcon,
    ]) => {

      Navigation.setDefaultOptions({
        statusBar: {
          backgroundColor: colors.primary,
        },
        topBar: {
          title: {
            component: {
              name: 'TopBar',
              color: colors.grey,
              aligment: 'center',
            },
          },
        },
        bottomTab: {
          fontSize: 12,
          iconColor: colors.greyLight,
          textColor: colors.greyLight,
          selectedIconColor: colors.primary,
          selectedTextColor: colors.primary,
        },
      });
      

      Navigation.setRoot({
        root: {
          sideMenu: {
            center: {
              bottomTabs: {
                children: [
                  stack('Events', '活動列表', createIcon),
                  stack('Friend', '朋友圈', usersIcon),
                  stack('Rooms', '聊天', chatIcon),
                  stack('Profile', '設置', settingIcon),
                ],
              },
            },
          },
        },
      });
    }
  );
};

export default rootNavigator;
