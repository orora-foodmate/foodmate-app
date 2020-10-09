import { Navigation } from 'react-native-navigation';
import { startMain } from '~/navigation';

Navigation.events().registerAppLaunchedListener(() => {
console.log("registerAppLaunchedListener")
  startMain();
});