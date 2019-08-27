export const userIdSchema = {
  name: 'UserIds',
  properties: {
    userId: {type: 'string'}
  }
};

export const friendSchema = {
  name: 'Friends',
  properties: {
    from: {type: 'string'},
    to: {type: 'string'},
    group_id: {type: 'string'},
    create_time: {type: 'date'},    
  }
};

export const groupSchema = {
  name: 'Groups',
  properties: {
    from: {type: 'string'},
    name: {type: 'string'},
    type: {type: 'int', default: 1}, // 1: 群聯 2: 官群
    create_time: {type: 'date'},
    member: {type: 'UserIds[]'},
  }
};

export const messageSchema = {
  name: 'Messages',
  properties: {
    from: {type: 'string'},
    to: {type: 'string'},
    group_id: {type: 'string'},
    create_time: {type: 'date'},
    msg_type: {type: 'string'}, // 0: 文字, 1: 圖片, 2: 語音, 3: 視頻, 4: 檔案,
    content: {type: 'string'},
    room_id: {type: 'string'},
  }
};
