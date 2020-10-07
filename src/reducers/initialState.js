import { fromJS } from 'immutable';

export const authState = fromJS({
  isAuth: false,
  confirmation: null,
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
