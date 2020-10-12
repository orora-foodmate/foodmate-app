import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Navigation } from 'react-native-navigation';
import MainScreen from '~/screens/MainScreen';
import OtherScreen from '~/screens/OtherScreen';
import MessageScreen from '~/screens/MessageScreen';
import SettingScreen from '~/screens/SettingScreen';
import LoginScreen from '~/screens/LoginScreen';
import App from '~/App';
import SearchScreen from '~/screens/SearchScreen';

const Screens = new Map();

Screens.set('Main', MainScreen);
Screens.set('Login', LoginScreen);
Screens.set('Message', MessageScreen);
Screens.set('Friend', OtherScreen);
Screens.set('Setting', SettingScreen);
Screens.set('SearchFriend', SearchScreen);

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