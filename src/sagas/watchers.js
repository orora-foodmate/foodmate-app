import types from '../constants/actionTypes';
import { take, call, takeLatest, actionChannel } from 'redux-saga/effects';
import { loginSaga } from './authSagas';
import { initialAppSaga } from './initialAppSaga';
import { getFriendsSaga } from './friendSagas';
import { getRoomsSaga } from './roomSagas';

export function* watchInitialAppSaga() {
  yield takeLatest(types.INITIAL_APP, initialAppSaga);
}

export function* watchLoginSaga() {
  yield takeLatest(types.LOGIN, loginSaga);
}

export function* watchGetFriendsSaga() {
  const friendChan = yield actionChannel(types.GET_FRIENDS);
  while(true) {
    const actionObject = yield take(friendChan);
    yield call(getFriendsSaga, actionObject);
  }
}

export function* watchGetRoomsSaga() {
  const roomChan = yield actionChannel(types.GET_ROOMS);
  console.log('function*watchGetRoomsSaga -> types.GET_ROOMS', types.GET_ROOMS)
  while(true) {
    const actionObject = yield take(roomChan);
    console.log('function*watchGetRoomsSaga -> getRoomsSaga', getRoomsSaga)
    yield call(getRoomsSaga, actionObject);
  }
}