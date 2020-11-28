import { eventChannel } from 'redux-saga';
import socketClusterHelper from '~/helper/socketClusterHelpers';

function createWebsocketChannel() {
  return eventChannel((emit) => {
    socketClusterHelper.setEmit(emit);
    return () => {
      socketClusterHelper.close();
      socketClusterHelper.setEmit(null);
    };
  });
}

export default function* initWebsocketChannel() {
  const wsUnsubscribe = createWebsocketChannel();
  yield put({ type: types.REGISTER_WEBSOCKET_SUCCESS, payload: { wsUnsubscribe } });
}
