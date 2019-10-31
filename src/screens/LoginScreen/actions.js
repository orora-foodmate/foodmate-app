import { getTokenResult } from '../../apis/api';

export const loginAction = (dispatch, payload) => {
  dispatch({
    types: ['LOGIN', 'LOGIN_SUCCESS', 'LOGIN_ERROR'],
    promise: getTokenResult(payload)
  });
};
