import types from '../constants/actionTypes';

export const getMessagesAction = payload => ({
  type: types.GET_MESSAGES,
  payload,
});

export const addMessageAction = payload => ({
  type: types.ADD_MESSAGE,
  payload,
});

export const addMessageByWebsocketAction = payload => ({
  type: types.ADD_MESSAGE_BY_WEBSOCKET,
  payload,
});
