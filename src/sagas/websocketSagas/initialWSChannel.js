
import { eventChannel } from 'redux-saga';
import { put } from 'redux-saga/effects';
import socketClusterHelper from '~/helper/socketClusterHelpers';

export function createWebsocketChannel() {
  return eventChannel((emit) => {
    socketClusterHelper.setEmit(emit);
    return () => {
      socketClusterHelper.close();
      socketClusterHelper.setEmit(null);
    };
  });
}


export function* forwardMessageSaga({ type, ...payload }) {
  yield put({
    type,
    payload,
  });
}
