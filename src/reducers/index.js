
import { combineReducers } from 'redux';
import auth from './authReducer';
import setting from './settingReducer';
import search from './searchReducer';

export default combineReducers({
  auth,
  search,
  setting,
});
