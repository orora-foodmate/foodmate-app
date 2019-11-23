import Queue from 'js-queue';
import isEmpty from 'lodash/isEmpty';
import { getQueryArray } from '../../helpers/queryHelpers';
import { database, getMessage } from './index';

const handleWatermelonQueue = new Queue();

handleWatermelonQueue.stop = false;
handleWatermelonQueue.autoRun = true;


export const createMessage = message => async () => {
  const { roomId, msgId } = message;
  const query = {
    room_id: roomId,
    msg_id: msgId
  };
  const [messageData = null] = await getMessage(query);

  if (!isEmpty(messageData)) {
    handleWatermelonQueue.next();
    return messageData;
  }

  const messageCollection = database.collections.get('messages');
  const result = await database.action(async () => {
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
  handleWatermelonQueue.next();
  return result;
};

export const createUser = data => async () => {
  const userCollection = database.collections.get('users');
  const result = await database.action(async () => {
    const { user_id } = data;
    const queryArray = getQueryArray({ user_id });
    const [localUser = null] = await userCollection
      .query(...queryArray)
      .fetch();
    if (!isEmpty(localUser)) return handleWatermelonQueue.next();

    return await userCollection.create(user => {
      user.user_id = data.userId;
      user.username = data.username;
      user.belong_to = data.belongTo;
      user.level = data.level;
      user.identity_code = data.identityCode;
      user.create_time = data.createTime;
      user.device_name = data.deviceName;
      user.device_code = data.deviceCode;
      user.last_online_type = data.lastOnlineType;
      user.last_online_ip = data.lastOnlineIp;
      user.status = data.status;
      return user;
    });
  });
  handleWatermelonQueue.next();
  return result;
};

export const createUserTask = params => {
  return handleWatermelonQueue.add(createUser(params));
};

export const createMessageTask = params => {
  return handleWatermelonQueue.add(createMessage(params));
};
