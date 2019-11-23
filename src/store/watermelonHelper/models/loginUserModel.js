import pick from 'lodash/pick';
import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

class loginUserModel extends Model {
  static table = 'loginUser';

  @field('uid') uid;
  @field('email') email;
  @field('phone_number') phone_number;
  @field('display_name') display_name;
  @field('gender') gender;
  @field('job_title') job_title;
  @field('soul_food') soul_food;
  @field('info') info;
  @field('photo_url') photo_url;
  @field('is_notification') is_notification;
  @field('is_camera') is_camera;
  @field('is_album') is_album;
  @field('rate') rate;
  @field('disabled') disabled;
  @field('created_at') created_at;
  @field('updated_at') updated_at;

  get rowData () {
    const userId = this.user_id;
    const isAuth = this.is_auth;
    const user = pick(this, ['access_token', 'refresh_token', 'username', 'expired', 'scope']);
    return {...user, userId, isAuth};
  }
}

export default loginUserModel;
