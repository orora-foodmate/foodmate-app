import { Base64 } from 'js-base64';
import { Cache } from 'react-native-cache';
import AsyncStorage from '@react-native-community/async-storage';
import isEmpty from 'lodash/isEmpty';

const FIRST_LAUNCH_KEY = '@$FIRST_LAUNCH';
const LOGIN_USER_KEY = '@$LOGIN_USER';

export const DEFAULT_USER = {
  account: '',
  avatar: '',
  token: '',
  _id: '',
  name: '',
};

const loginUserCache = new Cache({
  namespace: "loginUser",
  policy: {
      maxEntries: 1
  },
  backend: AsyncStorage
});

export const validateIsFirstLaunch = async () => {
  const firstLaunchValue = AsyncStorage.getItem(FIRST_LAUNCH_KEY);
  const isFirstLaunch = !Boolean(firstLaunchValue);
  if(isFirstLaunch) {
    await AsyncStorage.setItem(FIRST_LAUNCH_KEY, '1');
  }
  return isFirstLaunch;
}

export const saveLoginUser = (user) => loginUserCache.set(LOGIN_USER_KEY, JSON.stringify(user));

export const getLoginUser = async () => {
  const loginUserStr = await loginUserCache.get(LOGIN_USER_KEY);
  const isAuth = !isEmpty(loginUserStr);
  if(isEmpty(loginUserStr)) return {...DEFAULT_USER, isAuth};

  return {...JSON.parse(loginUserStr), isAuth};
}

export const encodeAuthBasicToken = (code) => Base64.encode(code);

