import { decode, encode } from 'base-64';
import { addRxPlugin, createRxDatabase } from 'rxdb';
import { useFriendsHook } from './hooks/friendHooks';
import isEmpty from 'lodash/isEmpty';
import SQLite from 'react-native-sqlite-2';
import SQLiteAdapterFactory from 'pouchdb-adapter-react-native-sqlite';
import userSchema from './userSchema';
import friendSchema from './friendSchema';
import messageSchema from './messageSchema';

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

// Avoid using node dependent modules
process.browser = true;

let foodmateDB = null;

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
      methods: {
        updateStatus: function (status) {
          this.status = status;
          return this.save();
        }
      },
      statics: {
        findAndUpdateStatus: async function (friend, status) {
          const doc = await this.findOne({ id: friend.id });
          if (isEmpty(doc)) {
            await this.create({ ...friend, status });
          } else {
            doc.status = status;
            await doc.save();
          }
        }
      },
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
  foodmateDB = database;
  await initialCollections(database);

  return database;
};

export const useFriends = useFriendsHook(foodmateDB);