const eventSchema = {
  title: 'events',
  version: 0,
  description: 'events',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      primary: true,
    },
    meetingGeoJson: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
        },
        coordinates: {
          type: 'array',
          items: {
            type: 'number'
          },
        },
      },
    },
    creator: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
        },
        phone: {
          type: ['string', 'null'],
        },
        gender: {
          type: ['number', 'null'],
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
    },
    users: {
      type: 'array',
      uniqueItems: true,
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          status: {
            type: 'number',
            enums: [0, 1, 2],
          },
          info: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
              },
              phone: {
                type: ['string', 'null'],
              },
              gender: {
                type: ['number', 'null'],
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
          },
        },
      },
    },
    title: {
      type: 'string',
    },
    logo: {
      type: 'string',
    },
    publicationPlace: {
      type: 'string',
    },
    room: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    createAt: {
      type: 'string',
      format: 'date-time',
    },
    updateAt: {
      type: 'string',
      format: 'date-time',
    },
    finalReviewAt: {
      type: 'string',
      format: 'date-time',
    },
    datingAt: {
      type: 'string',
      format: 'date-time',
    },
    status: {
      type: 'number',
      enums: [0, 1, 2],
    },
    type: {
      type: 'number',
      enums: [0, 1, 2],
    },
    paymentMethod: {
      type: 'number',
      enums: [0, 1, 2, 3],
    },
    userCountMax: {
      type: 'number',
    },
    budget: {
      type: 'number',
    },
  },
  indexes: ['id', 'updateAt', 'createAt'],
  required: [],
  encrypted: [],
};

export default eventSchema;
