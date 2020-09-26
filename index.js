/**
 * @format
 */

import { Navigation } from "react-native-navigation";
import { pushSingleScreenApp } from '~/navigation';

Navigation.events().registerAppLaunchedListener(() => pushSingleScreenApp());
