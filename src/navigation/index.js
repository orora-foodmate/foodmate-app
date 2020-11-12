import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Navigation } from 'react-native-navigation';
import MainScreen from '~/screens/MainScreen';
import FriendScreen from '~/screens/FriendScreen';
import MessageScreen from '~/screens/MessageScreen';
import SettingScreen from '~/screens/SettingScreen';
import LoginScreen from '~/screens/LoginScreen';
import SearchScreen from '~/screens/SearchScreen';
import ChatScreen from '~/screens/ChatScreen';
import RegisterScreen from '~/screens/RegisterScreen';
import NicknameScreen from '~/screens/NicknameScreen';
import EditProfileScreen from '~/screens/EditProfileScreen';
import CreateActivityScreen from '~/screens/CreateActivityScreen';

import TopBar from '~/components/TopBar';

import App from '~/App';

const Screens = new Map();

Screens.set('Main', MainScreen);
Screens.set('Login', LoginScreen);
Screens.set('Message', MessageScreen);
Screens.set('Friend', FriendScreen);
Screens.set('Setting', SettingScreen);
Screens.set('Chat', ChatScreen);
Screens.set('SearchFriend', SearchScreen);
Screens.set('Register', RegisterScreen);
Screens.set('Nickname', NicknameScreen);
Screens.set('EditProfile', EditProfileScreen);
Screens.set('Create', CreateActivityScreen);

Navigation.registerComponent('TopBar', () => TopBar);


Screens.forEach((C, key) => {
  return Navigation.registerComponent(
    key,
    () => gestureHandlerRootHOC(App(C)),
    () => C
  )
});


export const startMain = () => {
  Navigation.setRoot({
    root: {
      component: {
        name: 'Main'
      }
    }
  });
};