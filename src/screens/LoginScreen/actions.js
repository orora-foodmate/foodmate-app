import { getTokenResult } from '../../apis/api';

export const loginAction = (dispatch, payload) => {
  dispatch({
    type: 'LOGIN_SUCCESS',
    payload
  });
};
