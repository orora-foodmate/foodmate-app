import types from '../constants/actionTypes';
import { authState } from './initialState';

const loginSuccess = (auth, payload) =>
  auth.merge({ ...payload, isAuth: true });

const logoutSuccess = () =>
  authState;

export default function reducer(auth = authState, { type, payload }) {
  switch (type) {
    case types.SET_LOGIN_USER:
      return auth.merge(payload);
    case types.LOGOUT_SUCCESS:
      return logoutSuccess();
    case types.LOGIN_SUCCESS:
      return loginSuccess(auth, payload);
    case types.LOGIN:
    case types.LOGIN_ERROR:
    case types.LOGOUT:
    case types.LOGOUT_ERROR:
    default:
      return auth;
  }
}
