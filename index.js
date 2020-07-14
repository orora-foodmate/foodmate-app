/**
 * @format
 */
import { decode, encode } from 'base-64'

if (!global.btoa) {
    global.btoa = encode;
}

if (!global.atob) {
    global.atob = decode;
}

// Avoid using node dependent modules
process.browser = true;

import { addRxPlugin, createRxDatabase } from 'rxdb';
import SQLite from 'react-native-sqlite-2'
import SQLiteAdapterFactory from 'pouchdb-adapter-react-native-sqlite'

const SQLiteAdapter = SQLiteAdapterFactory(SQLite)

addRxPlugin(SQLiteAdapter);
addRxPlugin(require('pouchdb-adapter-http'));
const initSQL = async () => {
  const database = await createRxDatabase({
    name: 'mydatabase',
    adapter: 'react-native-sqlite' // the name of your adapter
});
console.log("database", database)
};

initSQL();


import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
