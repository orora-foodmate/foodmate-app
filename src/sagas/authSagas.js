import { put, call } from 'redux-saga/effects';
import types from '../constants/actionTypes';
import { loginResult } from '../apis/api';
import { saveLoginUser } from '../helpers/authHelpers';
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
  console.log("function*loginSaga -> loginSaga", loginSaga)
  try {
    const { result } = yield call(loginResult, payload);
    console.log("function*loginSaga -> result", result)

    yield call(saveLoginUser, result.data);
    yield put(okLogin(result.data));
  } catch (error) {
    console.log("function*loginSaga -> error", error)
    const errorAction = errLogin(error);
    yield put(errorAction);
  }
}

const okGet = (confirmation) => ({
  type: types.GET_CONFIRMATION_CODE_SUCCESS,
  payload: confirmation
});

const errGet = ({ message, status }) => {
  return {
    type: types.GET_CONFIRMATION_CODE_ERROR,
    payload: {
      message
    }
  };
};

export function* getConfirmCodeSaga({ payload }) {
  try {

    yield put(okGet({}));
  } catch (error) {
    const errorAction = errGet(error);
    yield put(errorAction);
  }
}