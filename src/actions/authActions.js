import types from '~/constants/actionTypes';

export const loginAction = payload => ({
  type: types.LOGIN,
  payload
});

export const logoutAction = () => ({
  type: types.LOGOUT,
});

export const registerUserAction = (payload) => ({
  type: types.REGISTER_USER,
  payload,
})