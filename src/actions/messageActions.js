import types from '../constants/actionTypes';

export const addMessageAction = payload => ({
  type: types.ADD_MESSAGE,
  payload,
});
