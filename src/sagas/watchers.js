import types from '../constants/actionTypes';
import { take, call, takeLatest, actionChannel } from 'redux-saga/effects';
import { loginSaga, logoutSaga, registerUserSaga } from './authSagas';
import { initialAppSaga } from './initialAppSaga';
import { approveInviteFriendSaga, getFriendsSaga, inviteFriendSaga, rejectInviteFriendSaga } from './friendSagas';
import { addMessageSaga, getMessagesSaga } from './messageSagas';
import { addMessageByWebsocketSaga } from './messageByWebsocketSagas';
import { getUserByIdSaga, updateUserSaga } from './userSagas';
import { approveFriendByWebsocketSaga, inviteFriendByWebsocketSaga, rejectFriendByWebsocketSaga } from './websocketSagas/friendSagas';
import { createEventSaga } from './eventSagas';

export function* watchInitialAppSaga() {
  yield takeLatest(types.INITIAL_APP, initialAppSaga);
}

export function* watchregisterUserSaga() {
  yield takeLatest(types.REGISTER_USER, registerUserSaga);
}

export function* watchLoginSaga() {
  yield takeLatest(types.LOGIN, loginSaga);
}

export function* watchLogoutSaga() {
  yield takeLatest(types.LOGOUT, logoutSaga);
}

export function* watchCreateEventSaga() {
  yield takeLatest(types.CREATE_EVENT, createEventSaga);
}

export function* watchGetMessagesSaga() {
  yield takeLatest(types.GET_MESSAGES, getMessagesSaga);
}

export function* watchGetUserByIdSaga() {
  yield takeLatest(types.GET_USER_BY_ID, getUserByIdSaga);
}

export function* watchUpdateUserSaga() {
  yield takeLatest(types.INIT_USERNAME, updateUserSaga);
}

export function* watchInviteFriendSaga() {
  yield takeLatest(types.INVITE_FRIEND, inviteFriendSaga);
}

export function* watchRejectInviteFriendSaga() {
  yield takeLatest(types.REJECT_INVITE_FRIEND, rejectInviteFriendSaga);
}

export function* watchApproveInviteFriendSaga() {
  yield takeLatest(types.APPROVE_INVITE_FRIEND, approveInviteFriendSaga);
}

export function* watchGetFriendsSaga() {
  const friendChan = yield actionChannel(types.GET_FRIENDS);
  while(true) {
    const actionObject = yield take(friendChan);
    yield call(getFriendsSaga, actionObject);
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

export function* watchInviteFriendByWebsocketSaga() {
  const inviteFriendChan = yield actionChannel(types.INVITE_FRIEND_BY_WEBSOCKET);
  while(true) {
    const actionObject = yield take(inviteFriendChan);
    yield call(inviteFriendByWebsocketSaga, actionObject);
  }
}

export function* watchRejectFriendByWebsocketSaga() {
  const rejectFriendChan = yield actionChannel(types.REJECT_FRIEND_BY_WEBSOCKET);
  while(true) {
    const actionObject = yield take(rejectFriendChan);
    yield call(rejectFriendByWebsocketSaga, actionObject);
  }
}

export function* watchApproveFriendByWebsocketSaga() {
  const approveFriendChan = yield actionChannel(types.APPROVE_FRIEND_BY_WEBSOCKET);
  while(true) {
    const actionObject = yield take(approveFriendChan);
    yield call(approveFriendByWebsocketSaga, actionObject);
  }
}
