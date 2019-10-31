import pick from 'lodash/pick';
import { Model } from '@nozbe/watermelondb';
import { field, relation } from '@nozbe/watermelondb/decorators';

class messageModel extends Model {
  static table = 'messages';
  static associations = {
    from: { type: 'has_many', foreignKey: 'user_id' },
    to: { type: 'has_many', foreignKey: 'user_id' },
  };
  @field('cmd') cmd;
  @field('content') content;
  @field('create_time') create_time;
  @field('from') from;
  @field('to') to;
  @field('msg_id') msg_id;
  @field('msg_type') msg_type;
  @field('room_id') room_id;
  @relation('users', 'user_id') from_user;
  @relation('users', 'user_id') to_user;

  get rowData() {
    const msgType = this.msg_type;
    const msgId = this.msg_id;
    const roomId = this.room_id;
    const createTime = this.create_time;
    const fromUser = this.from_user;
    const toUser = this.to_user;

    const message = pick(this, ['cmd', 'content', 'from', 'to']);
    return { ...message, msgType, msgId, roomId, createTime };
  }

  get textContent() {
    return {
      _id: this.msg_id,
      sender: this.from,
      user: {
        _id: this.from,
        avatar: 'https://placeimg.com/140/140/any'
      },
      createAt: this.create_time,
      text: this.content
    };
  }
}

export default messageModel;
