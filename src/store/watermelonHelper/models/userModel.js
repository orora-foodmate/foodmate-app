import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

class userModel extends Model {
  static table = 'users';

  @field('user_id') user_id;
  @field('username') username;
  @field('belone_to') belone_to;
  @field('level') level;
  @field('identity_code') identity_code;
  @field('create_time') create_time;
  @field('is_friend') is_friend;
  @field('device_name') device_name;
  @field('device_code') device_code;
  @field('last_online_type') last_online_type;
  @field('last_online_ip') last_online_ip;
  @field('status') status;

  get rowData() {
    const {user_id} = this;
    return {user_id};
  }
}

export default userModel;
