// @flow

import React from 'react';
import { Navigation } from 'react-native-navigation';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';

import {
  LOGIN_SCREEN,
  HOME_SCREEN,
} from './Screens';

// function WrappedComponent(Component) {
//   return function inject(props) {
//     const EnhancedComponent = () => (
//       <Provider>
//         <Component
//           {...props}
//         />
//       </Provider>
//     );

//     return <EnhancedComponent />;
//   };
// }

export default function () {
  Navigation.registerComponent(LOGIN_SCREEN, () => LoginScreen);
  Navigation.registerComponent(HOME_SCREEN, () => HomeScreen);
  console.info('All screens have been registered...');
}