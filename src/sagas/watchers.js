import types from '../constants/actionTypes';
import { take, call, takeLatest, actionChannel } from 'redux-saga/effects';
import { loginSaga } from './authSagas';
import { initialAppSaga } from './initialAppSaga';
import { getFriendsSaga } from './friendSagas';

export function* watchInitialAppSaga() {
  yield takeLatest(types.INITIAL_APP, initialAppSaga);
}

export function* watchLoginSaga() {
  yield takeLatest(types.LOGIN, loginSaga);
}

export function* watchGetFriendSaga() {
  const requestChan = yield actionChannel(types.GET_FRIENDS);
  // yield takeLatest(types.GET_FRIENDS, getFriendsSaga);
  while(true) {
    const actionObject = yield take(requestChan);
    yield call(getFriendsSaga, actionObject);
  }
}
