import types from '../constants/actionTypes';
import { authState } from './initialState';
import { fromJS } from 'immutable';

export default function reducer(auth = authState, { type, payload }) {
  switch (type) {
    case types.LOGIN_SUCCESS:
      return auth.merge(fromJS({ isAuth: true, ...payload }));
    case types.GET_CONFIRMATION_CODE_SUCCESS:
      return auth.merge({ confirmation: payload });
    case types.GET_CONFIRMATION_CODE:
    case types.GET_CONFIRMATION_CODE_ERROR:
    case types.LOGIN:
    case types.LOGIN_ERROR:
    default:
      return auth;
  }
}
