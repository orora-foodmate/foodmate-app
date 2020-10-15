import types from '../constants/actionTypes';

export const getRoomsAction = payload => ({
  type: types.GET_ROOMS,
  payload,
});
