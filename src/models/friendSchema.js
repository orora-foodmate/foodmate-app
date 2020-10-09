const friendSchema = {
  title: 'friends',
  version: 0,
  description: 'friends',
  type: 'object',
  properties: {
    users: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    creator: {
      type: 'string',
      ref: 'users',
    },
    createAt: {
      type: 'string',
      format: 'date-time',
    },
    updateAt: {
      type: 'string',
      format: 'date-time',
    },
    status: {
      type: 'number',
    },
  },
  required: [],
  encrypted: [],
};

export default friendSchema;
