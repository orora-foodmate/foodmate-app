import {decode, encode} from 'base-64';
import {addRxPlugin, createRxDatabase} from 'rxdb';
import SQLite from 'react-native-sqlite-2';
import SQLiteAdapterFactory from 'pouchdb-adapter-react-native-sqlite';
import userSchema from './userSchema';
import friendSchema from './friendSchema';
import roomSchema from './roomSchema';
import messageSchema from './messageSchema';

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

// Avoid using node dependent modules
process.browser = true;

const SQLiteAdapter = SQLiteAdapterFactory(SQLite);

addRxPlugin(SQLiteAdapter);
addRxPlugin(require('pouchdb-adapter-http'));

export const destoryDatabase = async (database) => {
  return await Promise.all([
    database.users.remove(),
    database.friends.remove(),
    database.rooms.remove(),
    database.messages.remove(),
  ]);
};

export const initialCollections = async (database) => {
  return await Promise.all([
    database.collection({
      name: 'users',
      schema: userSchema,
    }),
    database.collection({
      name: 'friends',
      schema: friendSchema,
    }),
    database.collection({
      name: 'rooms',
      schema: roomSchema,
    }),
    database.collection({
      name: 'messages',
      schema: messageSchema,
    }),
  ]);
};

export const initSQL = async () => {
  const database = await createRxDatabase({
    name: 'foodmate',
    adapter: 'react-native-sqlite', // the name of your adapter
    multiInstance: false,
    ignoreDuplicate: true,
  });

  await initialCollections(database);

  return database;
};
