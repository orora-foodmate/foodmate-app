const userSchema = {
  title: 'login user',
  version: 0,
  description: 'login user',
  type: 'object',
  properties: {
    account: {
      type: 'string',
      primary: true,
      default: '',
    },
    avatar: {
      type: 'string',
      default: '',
    },
    token: {
      type: 'string',
      default: '',
    },
    id: {
      type: 'string',
      default: '',
    },
  },
  required: [],
  encrypted: [],
};

export default userSchema;
