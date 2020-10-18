import types from '../constants/actionTypes';

export const getUserByIdAction = payload => ({
  type: types.GET_USER_BY_ID,
  payload,
});

export const getFriendsAction = payload => ({
  type: types.GET_FRIENDS,
  payload,
});

export const inviteFriendAction = payload => ({
  type: types.INVITE_FRIEND,
  payload,
});

export const rejectInviteFriendAction = payload => ({
  type: types.REJECT_INVITE_FRIEND,
  payload,
});

export const approveInviteFriendAction = payload => ({
  type: types.APPROVE_INVITE_FRIEND,
  payload,
})