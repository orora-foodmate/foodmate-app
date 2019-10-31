import { Database, Q } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import schema from './schema';
import loginUserModel from './models/loginUserModel';
import { getQueryArray } from '../../helpers/queryHelpers';

const adapter = new SQLiteAdapter({ dbName: 'imapp', schema });

export const database = new Database({
  adapter,
  modelClasses: [loginUserModel],
  actionsEnabled: true
});

export const getUserById = async user_id => {
  const queryArray = getQueryArray({ user_id });
  const users = await database.collections.get('users').query(...queryArray).fetch();
  const [user] = users;
  return user;
};

export const createLoginUser = async source => {
  const loginUserCollection = database.collections.get('loginUser');
  return await database.action(async () => {
    return await loginUserCollection.create(user => {
      user.access_token = source.access_token;
      user.refresh_token = source.refresh_token;
      user.user_id = source.userId;
      user.username = source.username;
      user.is_auth = true;
      user.expired = source.expired;
      user.scope = source.scope;
      return user;
    });
  });
};

export const deleteLoginUser = async () => {
  const loginUserCollection = database.collections.get('loginUser');
  return await database.action(async () => {
    const [user] = await loginUserCollection.query().fetch();
    return user.destroyPermanently();
  });
};

export const getLoginUser = async () => {
  const loginUserCollection = database.collections.get('loginUser');
  const [loginUser] = await loginUserCollection.query().fetch();
  return loginUser.rowData;
};
export const watchLoginUser = () => {
  const loginUserCollection = database.collections.get('loginUser');
  return loginUserCollection.query();
};
