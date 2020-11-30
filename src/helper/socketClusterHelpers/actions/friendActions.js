import types from '~/constants/actionTypes';

export const inviteFriendByWebsocketAction = payload => ({
  type: types.INVITE_FRIEND_BY_WEBSOCKET,
  payload,
});

export const rejectFriendByWebsocketAction = payload => ({
  type: types.REJECT_FRIEND_BY_WEBSOCKET,
  payload,
});

export const approveFriendByWebsocketAction = payload => ({
  type: types.APPROVE_FRIEND_BY_WEBSOCKET,
  payload,
});
