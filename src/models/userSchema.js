const userSchema = {
  version: 0,
  title: 'human schema no compression',
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
    account: {
      type: 'string',
    },
    avatar: {
      type: 'string',
    },
  },
  indexes: [
    'id',
  ],
};

export default userSchema;
