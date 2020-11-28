import types from '~/constants/actionTypes';

export const createEventByWebsocketAction = payload => ({
  type: types.CREATE_EVENT_BY_WEBSOCKET,
  payload,
});
