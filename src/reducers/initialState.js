import {fromJS} from 'immutable';
export const authState = fromJS({
  isAuth: false,
  token: ''
});

export const settingState = fromJS({
  isInitialed: false,
});

export default {
  auth: authState
};
