import Realm from 'realm';
import {
  friendSchema,
  groupSchema,
  messageSchema,
  userIdSchema
} from './schemas';
import {initialQueueFactory} from '../taskManager';

let realmClient = null;

export const initialRealmClient = async () => {
  try {
  const client = Realm.open({
    schema: [friendSchema, groupSchema, messageSchema, userIdSchema]
  });
  await initialQueueFactory();
  realmClient = client;

  return client;
  }catch(error) {
    throw error;
  }
};
