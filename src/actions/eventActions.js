import types from '~/constants/actionTypes';

export const createEventAction = payload => ({
  type: types.CREATE_EVENT,
  payload
});

export const joinEventAction = payload => ({
  type: types.JOIN_EVENT,
  payload,
});

export const leaveEventAction = payload => ({
  type: types.LEAVE_EVENT,
  payload,
});

export const validEventMemberAction = payload => ({
  type: types.VALID_MEMBER,
  payload
})

export const rejectEventMemberByAdminAction = payload => ({
  type: types.REJECT_MEMBER_BY_ADMIN,
  payload,
});
