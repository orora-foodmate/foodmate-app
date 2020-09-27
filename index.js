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


import { Navigation } from "react-native-navigation";
import { pushSingleScreenApp } from '~/navigation';

Navigation.events().registerAppLaunchedListener(() => pushSingleScreenApp());
