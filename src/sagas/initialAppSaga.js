import types from '~/constants/actionTypes';
import { call, put } from 'redux-saga/effects';
import { initSQL } from '~/models';
import { getLoginUser, validateIsFirstLaunch } from '~/helper/authHelpers';
import socketClusterHelper from '~/helper/socketClusterHelpers';
import messaging from '@react-native-firebase/messaging';

async function onAppBootstrap(isFirstLaunch) {
  const messagingInstance = messaging();
  if(isFirstLaunch) {
    await messagingInstance.registerDeviceForRemoteMessages();
  }
  
  await messagingInstance.requestPermission();
  const fcmToken = await messagingInstance.getToken();
  return fcmToken;
}

const okInitial = (payload) => ({
  type: types.INITIAL_APP_SUCCESS,
  payload,
});

const errInitial = ({ message }) => ({
  type: types.INITIAL_APP_ERROR,
  payload: { message },
});

export function* initialAppSaga() {
  try {
    const isFirstLaunch = yield call(validateIsFirstLaunch);
    const loginUser = yield call(getLoginUser);
    const database = yield call(initSQL, isFirstLaunch);
    const fcmToken = yield call(onAppBootstrap, isFirstLaunch);

    const socket = loginUser.isAuth
      ? socketClusterHelper.initialClient(loginUser.token)
      : null;

    const resAction = true
      ? okInitial({ database })
      : errInitial();
    yield put({
      type: types.SET_LOGIN_USER,
      payload: { ...loginUser, socket, fcmToken },
    });

    yield put(resAction);
  } catch (error) {
    const errorAction = errInitial(error);
    yield put(errorAction);
  }
}
