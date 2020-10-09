const userSchema = {
  version: 0,
  title: 'human schema no compression',
  type: 'object',
  properties: {
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
  indexes: [],
};

export default userSchema;
