const roomSchema = {
  title: 'rooms',
  version: 0,
  description: 'rooms',
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    creator: {
      type: 'string',
      ref: 'users',
    },
    users: {
      type: 'array',
      items: {
        type: 'string',
      },
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
    type: {
      type: 'number',
    },
  },
  required: [],
  encrypted: [],
};

export default roomSchema;
