import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Navigation} from 'react-native-navigation';
import colors from '~/theme/color';
import {stack} from './stack';

Feather.loadFont();

Navigation.setDefaultOptions({
  statusBar: {
    backgroundColor: colors.primary,
  },
  topBar: {
    title: {
      color: 'white',
    },
    backButton: {
      color: 'white',
    },
    background: {
      color: colors.primary,
    },
  },
  bottomTab: {
    fontSize: 14,
    selectedFontSize: 18,
    selectedIconColor: colors.primary,
    selectedTextColor: colors.primary,
  },
});

const rootNavigator = () => {
  Promise.all([
    MaterialIcons.getImageSource('add-circle', 25, colors.primary),
    MaterialIcons.getImageSource('add-circle', 25, colors.greyLight),
    MaterialIcons.getImageSource('forum', 25, colors.primary),
    MaterialIcons.getImageSource('forum', 25, colors.greyLight),
    MaterialIcons.getImageSource('person-pin', 25, colors.primary),
    MaterialIcons.getImageSource('person-pin', 25, colors.greyLight),
    MaterialIcons.getImageSource('settings', 25, colors.primary),
    MaterialIcons.getImageSource('settings', 25, colors.greyLight),
  ]).then(
    ([
      createIconActive,
      createIcon,
      chatIconActive,
      chatIcon,
      usersIconActive,
      usersIcon,
      settingIconActive,
      settingIcon,
    ]) => {
      Navigation.setRoot({
        root: {
          sideMenu: {
            center: {
              bottomTabs: {
                children: [
                  stack('Events', '活動列表', createIconActive, createIcon),
                  stack('Friend', '朋友圈', usersIconActive, usersIcon),
                  stack('Message', '聊天', chatIconActive, chatIcon),
                  stack('Profile', '設置', settingIconActive, settingIcon),
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
