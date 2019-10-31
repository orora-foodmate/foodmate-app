import pick from 'lodash/pick';
import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

class loginUserModel extends Model {
  static table = 'loginUser';

  @field('access_token') access_token;
  @field('refresh_token') refresh_token;
  @field('user_id') user_id;
  @field('username') username;
  @field('is_auth') is_auth;
  @field('expired') expired;
  @field('scope') scope;

  get rowData () {
    const userId = this.user_id;
    const isAuth = this.is_auth;
    const user = pick(this, ['access_token', 'refresh_token', 'username', 'expired', 'scope']);
    return {...user, userId, isAuth};
  }
}

export default loginUserModel;
