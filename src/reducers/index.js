
import { combineReducers } from 'redux';
import auth from './authReducer';
import setting from './settingReducer';
import search from './searchReducer';
import user from './userReducer';

export default combineReducers({
  auth,
  user,
  search,
  setting,
});
