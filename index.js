/**
 * @format
 */
import { Navigation } from "react-native-navigation";
import { switchScreen } from '~/navigation';

Navigation.events().registerAppLaunchedListener(() => switchScreen());
