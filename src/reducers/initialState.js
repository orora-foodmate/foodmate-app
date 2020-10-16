import { fromJS } from 'immutable';

export const authState = fromJS({
  isAuth: false,
  socket: null,
  account: '',
  avatar: '',
  token: '',
  _id: '',
  name: '',
});

export const settingState = fromJS({
  isInitialed: false,
  database: null,
});

export const searchState = fromJS({
  user: {}
});