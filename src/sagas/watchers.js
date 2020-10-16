import types from '../constants/actionTypes';
import { take, call, takeLatest, actionChannel } from 'redux-saga/effects';
import { loginSaga, logoutSaga } from './authSagas';
import { initialAppSaga } from './initialAppSaga';
import { getFriendsSaga } from './friendSagas';
import { getRoomsSaga } from './roomSagas';
import { addMessageSaga, getMessagesSaga } from './messageSagas';
import { addMessageByWebsocketSaga } from './messageByWebsocketSagas';

export function* watchInitialAppSaga() {
  yield takeLatest(types.INITIAL_APP, initialAppSaga);
}

export function* watchLoginSaga() {
  yield takeLatest(types.LOGIN, loginSaga);
}

export function* watchLogoutSaga() {
  yield takeLatest(types.LOGOUT, logoutSaga);
}

export function* watchGetMessagesSaga() {
  yield takeLatest(types.GET_MESSAGES, getMessagesSaga);
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
  while(true) {
    const actionObject = yield take(roomChan);
    yield call(getRoomsSaga, actionObject);
  }
}

export function* watchAddMessageSaga() {
  const messageChan = yield actionChannel(types.ADD_MESSAGE);
  while(true) {
    const actionObject = yield take(messageChan);
    yield call(addMessageSaga, actionObject);
  }
}

export function* watchAddMessageByWebsocketSaga() {
  const messageChan = yield actionChannel(types.ADD_MESSAGE_BY_WEBSOCKET);
  while(true) {
    const actionObject = yield take(messageChan);
    yield call(addMessageByWebsocketSaga, actionObject);
  }
}
