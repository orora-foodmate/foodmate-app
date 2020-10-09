import types from '../constants/actionTypes';
import { takeLatest } from 'redux-saga/effects';
import { loginSaga, logoutSaga } from './authSagas';
import { initialAppSaga } from './initialAppSaga';
import { getFriendsSaga } from './friendSagas';

export function* watchInitialAppSaga() {
  console.log("function*watchInitialAppSaga -> watchInitialAppSaga")
  yield takeLatest(types.INITIAL_APP, initialAppSaga);
}

export function* watchLoginSaga() {
  yield takeLatest(types.LOGIN, loginSaga);
}

// export function* watchLogoutSaga() {
//   yield takeLatest(types.LOGOUT, logoutSaga);
// }

export function* watchGetFriendSaga() {
  yield takeLatest(types.GET_FRIENDS, getFriendsSaga);
}
