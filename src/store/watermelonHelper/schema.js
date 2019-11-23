import { appSchema, tableSchema } from '@nozbe/watermelondb';

const loginUserSchema = tableSchema({
  name: 'loginUser',
  columns: [
    { name: 'user_id', type: 'number' },
    { name: 'username', type: 'string' },
    { name: 'access_token', type: 'string' },
    { name: 'is_auth', type: 'boolean' },
    { name: 'expired', type: 'string' },
    { name: 'refresh_token', type: 'string' },
    { name: 'scope', type: 'string' }
  ]
});

const messageSchema = tableSchema({
  name: 'messages',
  columns: [
    { name: 'cmd', type: 'number' },
    { name: 'content', type: 'string' },
    { name: 'create_time', type: 'string' },
    { name: 'from', type: 'string' },
    { name: 'to', type: 'string' },
    { name: 'msg_id', type: 'number' },
    { name: 'msg_type', type: 'number' },
    { name: 'room_id', type: 'number' }
  ]
});

const userSchema = tableSchema({
  name: 'users',
  columns: [
    { name: 'user_id', type: 'number' },
    { name: 'username', type: 'string' },
    { name: 'belong_to', type: 'string' },
    { name: 'level', type: 'string' },
    { name: 'identity_code', type: 'string' },
    { name: 'create_time', type: 'string' },
    { name: 'is_friend', type: 'boolean', default: false },
    { name: 'device_name', type: 'string', isOptional: true },
    { name: 'device_code', type: 'string', isOptional: true },
    { name: 'last_online_type', type: 'string', isOptional: true },
    { name: 'last_online_ip', type: 'string', isOptional: true },
    { name: 'status', type: 'number', isOptional: true }
  ]
});

export default appSchema({
  version: 1,
  tables: [loginUserSchema, messageSchema, userSchema]
});
