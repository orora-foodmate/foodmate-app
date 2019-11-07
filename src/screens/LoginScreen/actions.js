import { getTokenResult } from '../../apis/api';
import { loginActionTypes } from '../../constants/actionTypes';

export const loginAction = (dispatch, payload) => {
  dispatch({
    types: loginActionTypes,
    promise: getTokenResult(payload)
  });
};
