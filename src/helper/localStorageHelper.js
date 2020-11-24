import AsyncStorage from '@react-native-community/async-storage';
import isEmpty from 'lodash/isEmpty';

const FIRST_LAUNCH_KEY = '@$FIRST_LAUNCH';
const LOGIN_USER_KEY = '@$LOGIN_USER';
const WSDISCONNECT_KEY = '@$WSDISCONNECT_KEY';

export const DEFAULT_USER = {
  account: '',
  avatar: '',
  token: '',
  _id: '',
  name: '',
};

export const validateIsFirstLaunch = async () => {
  const firstLaunchValue = AsyncStorage.getItem(FIRST_LAUNCH_KEY);
  const isFirstLaunch = !Boolean(firstLaunchValue);
  if(isFirstLaunch) {
    await AsyncStorage.setItem(FIRST_LAUNCH_KEY, '1');
  }
  return isFirstLaunch;
}

export const getLoginUser = async () => {
  const loginUserStr = await AsyncStorage.getItem(LOGIN_USER_KEY);
  if(isEmpty(loginUserStr)) return DEFAULT_USER;

  return JSON.parse(loginUserStr);
}

export const saveLoginUser = (user) => AsyncStorage.setItem(LOGIN_USER_KEY, JSON.stringify(user));

export const getWSDisconnectTime = async () => {
  const WSDisconnectTime = await AsyncStorage.getItem(WSDISCONNECT_KEY);
  console.log("WSDisconnectTime", WSDisconnectTime)
  if(isEmpty(WSDisconnectTime)) return null;

  return WSDisconnectTime;
}

export const saveWSDisconnectTime = async () => {
  const dateString = new Date().toISOString();
  console.log("saveWSDisconnectTime -> dateString", dateString)
  await AsyncStorage.setItem(WSDISCONNECT_KEY, dateString)
};

