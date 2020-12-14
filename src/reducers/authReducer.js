import types from '../constants/actionTypes';
import {authState} from './initialState';

const loginSuccess = (auth, payload) => auth.merge({...payload, isAuth: true});

const logoutSuccess = (auth) => {
  const fcmToken = auth.get('fcmToken');
  return authState.merge({fcmToken});
};

export default function reducer(auth = authState, {type, payload}) {
  switch (type) {
    case types.UPDATE_PROFILE_SUCCESS:
    case types.SET_LOGIN_USER:
      return auth.merge(payload);
    case types.LOGOUT_SUCCESS:
      return logoutSuccess(auth);
    case types.LOGIN_SUCCESS:
    case types.INIT_USERNAME_SUCCESS:
      return loginSuccess(auth, payload);
    case types.LOGIN:
    case types.LOGIN_ERROR:
    case types.LOGOUT:
    case types.LOGOUT_ERROR:
    case types.REGISTER_USER:
    case types.REGISTER_USER_ERROR:
    case types.REGISTER_USER_SUCCESS:
    case types.INIT_USERNAME:
    case types.INIT_USERNAME_ERROR:
    case types.UPDATE_PROFILE:
    case types.UPDATE_PROFILE_ERROR:
    default:
      return auth;
  }
}
