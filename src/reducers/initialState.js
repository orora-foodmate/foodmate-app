import {fromJS} from 'immutable';
export const authState = fromJS({
  isAuth: false,
  token: ''
});

export const settingState = fromJS({
  isInitialed: false,
});

export const globalMessageState = fromJS({
  isVisible: false,
  message: '',
  type: 'confirm',
  hasIcon: false,
  iconType: '',
  iconName: ''
});

export default {
  auth: authState,
  setting: settingState,
  globalMessage: globalMessageState,
};
