import { getTokenResult } from '../apis';
import { loginActionTypes } from '../../../constants/actionTypes';

export const loginAction = (dispatch, payload) => {
  dispatch({
    types: loginActionTypes,
    promise: loginResult,
    payload,
  });
};
