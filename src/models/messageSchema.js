const messageSchema = {
  title: 'messages',
  version: 0,
  description: 'messages',
  type: 'object',
  properties: {
    _id: {
      type: 'string',
      primary: true
    },
    text: {
      type: 'string',
      default: null,
    },
    system: {
      type: 'boolean',
      default: false
    },
    user: {
      type: 'object',
      properties: {
        _id: {
          type: 'string',
        },
        name: {
          type: 'string',
        },
        avatar: {
          type: 'string',
        },
      }
    },
    createAt: {
      type: 'string',
      format: 'date-time',
    },
  },
  indexes: [
    'updateAt',
    'createAt',
  ],
  required: [],
  encrypted: [],
};

export default messageSchema;
