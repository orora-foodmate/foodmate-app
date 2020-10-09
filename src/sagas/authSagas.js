import { put, call } from 'redux-saga/effects';
import types from '~/constants/actionTypes';
import { loginResult } from '~/apis/api';
import { saveLoginUser } from '~/helper/authHelpers';

const okLogin = (payload) => ({
  type: types.LOGIN_SUCCESS,
  payload,
});

const errLogin = ({ message, status }) => {
  return {
    type: types.LOGIN_ERROR,
    payload: {
      message,
    }
  };
};

export function* loginSaga({ payload }) {
  try {
    const { result } = yield call(loginResult, payload);

    yield call(saveLoginUser, result.data);
    yield put(okLogin(result.data));
  } catch (error) {
    const errorAction = errLogin(error);
    yield put(errorAction);
  }
}