import { Database, Q } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import schema from './schema';
import loginUserModel from './models/loginUserModel';
import { getQueryArray } from '../../helpers/queryHelpers';
import isEmpty from 'lodash/isEmpty';

const adapter = new SQLiteAdapter({ dbName: 'imapp', schema });

export const database = new Database({
  adapter,
  modelClasses: [loginUserModel, messageModel, userModel],
  actionsEnabled: true
});

export const getUserById = async user_id => {
  const queryArray = getQueryArray({ user_id });
  const users = await database.collections.get('users').query(...queryArray).fetch();
  const [user] = users;
  return user;
};

export const watchMessagesCount = (query) => {
  const queryArray = getQueryArray(query);
  return database.collections.get('messages').query(...queryArray);
};

export const watchMessages = (query, {key, page = 1, size = 20}) => {
  const end = page * size;
  const queryArray = getQueryArray(query);
  const pageArray = [
    Q.where(key, Q.gte(1)),
    Q.where(key, Q.lt(end)),
  ];
  return database.collections.get('messages').query(...queryArray, ...pageArray);
};

export const getMessage = async (query = {}) => {
  const queryArray = getQueryArray(query);
  const messageCollection = database.collections.get('messages');
  const items = await messageCollection.query(...queryArray).fetch();
  return items.map(item => item.rowData);
};

export const createMessage = async message => {
  const { roomId, msgId } = message;
  const query = {
    room_id: roomId,
    msg_id: msgId,
  };
  const [messageData = null] = await getMessage(query);

  if (!isEmpty(messageData)) return messageData;

  const messageCollection = database.collections.get('messages');
  return await database.action(async () => {
    return await messageCollection.create(msg => {
      msg.cmd = message.cmd;
      msg.create_time = message.createTime;
      msg.from = message.from;
      msg.to = message.to;
      msg.msg_id = message.msgId;
      msg.msg_type = message.msgType;
      msg.room_id = message.roomId;
      msg.content = message.content;
      return msg.rowData;
    });
  });
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
