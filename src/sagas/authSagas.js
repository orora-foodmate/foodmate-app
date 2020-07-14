import { put, call } from 'redux-saga/effects';
import types from '../constants/actionTypes';
import { getTokenResult } from '../apis/api';
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
  console.log("function*loginSaga -> payload", payload)
  try {
    const {result} = yield call(getTokenResult, payload);

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
    const confirmation = yield firebaseSignInWithPhoneNumber(payload.phoneNumber);

    yield put(okGet(confirmation));
  } catch (error) {
    const errorAction = errGet(error);
    yield put(errorAction);
  }
}