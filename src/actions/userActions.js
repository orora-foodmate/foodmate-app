import types from '~/constants/actionTypes';

export const getMemberDetailAction = payload => ({
  type: types.GET_MEMBER_DETAIL,
  payload,
});
