
import { eventChannel } from 'redux-saga';
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
