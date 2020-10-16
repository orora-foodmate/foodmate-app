const roomSchema = {
  title: 'rooms',
  version: 0,
  description: 'rooms',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      primary: true
    },
    users: {
      type: 'array',
      items: {
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
        }
      },
    },
    creator: {
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
      }
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
  indexes: [
    'id',
    'updateAt',
    'createAt',
  ],
  required: [],
  encrypted: [],
};

export default roomSchema;
