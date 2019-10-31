/**
 * @format
 */
import 'es6-symbol/implement';
import React, {Fragment} from 'react';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import { StateInspector } from 'reinspect';

const AppContainer = () => (
  <Fragment>
    <StateInspector name='im-app'>
      <App />
    </StateInspector>
  </Fragment>
);

AppRegistry.registerComponent(appName, () => AppContainer);
