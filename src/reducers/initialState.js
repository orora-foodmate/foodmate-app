import { fromJS } from 'immutable';

export const authState = fromJS({
  fcmToken: '',
  description: '',
  isAuth: false,
  socket: null,
  account: '',
  avatar: '',
  token: '',
  id: '',
  name: '',
});

export const settingState = fromJS({
  isInitialed: false,
  database: null,
  wsUnsubscribe: null,
});

export const searchState = fromJS({
  user: {},
  hasSearch: false
});

export const memberState = fromJS({
  user: {}
})
