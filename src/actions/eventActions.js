import types from '~/constants/actionTypes';

export const createEventAction = payload => ({
  type: types.CREATE_EVENT,
  payload
});

export const joinEventAction = payload => ({
  type: types.JOIN_EVENT,
  payload,
});
