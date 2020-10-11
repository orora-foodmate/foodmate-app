const friendSchema = {
  title: 'friends',
  version: 0,
  description: 'friends',
  type: 'object',
  properties: {
    _id: {
      type: 'string',
      primary: true
    },
    users: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          _id: {
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
        _id: {
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
  required: [],
  encrypted: [],
};

export default friendSchema;
