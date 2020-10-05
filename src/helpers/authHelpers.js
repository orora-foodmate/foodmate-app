import { Base64 } from 'js-base64';
import { Cache } from 'react-native-cache';
import AsyncStorage from '@react-native-community/async-storage';

const LOGIN_USER_KEY = '$#_LOGIN_USER_KEY';

const loginUserCache = new Cache({
  namespace: "loginUser",
  policy: {
      maxEntries: 1
  },
  backend: AsyncStorage
});

export const saveLoginUser = (user) => loginUserCache.set(LOGIN_USER_KEY, JSON.stringify(user));

export const getLoginUser = async () => {
  const loginUserStr = await loginUserCache.get(LOGIN_USER_KEY);
  return JSON.parse(loginUserStr);
}

export const encodeAuthBasicToken = (code) => Base64.encode(code);

