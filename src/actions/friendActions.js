import types from '../constants/actionTypes';

export const getFriendsAction = payload => ({
  type: types.GET_FRIENDS,
  payload,
});
