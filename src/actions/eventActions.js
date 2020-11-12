import types from '~/constants/actionTypes';

export const createEventAction = payload => ({
  type: types.CREATE_EVENT,
  payload
});
