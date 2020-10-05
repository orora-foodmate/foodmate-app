import types from '../constants/actionTypes';
import { call, put } from 'redux-saga/effects';
import { initSQL } from '~/models';
import { getLoginUser, validateIsFirstLaunch } from '~/helpers/authHelpers';
import { privateScreens } from '~/navigation';

const okInitial = () => ({
  type: types.INITIAL_APP_SUCCESS,
  payload: {}
});

const errInitial = () => ({
  type: types.INITIAL_APP_ERROR,
  payload: {}
});

export function* initialAppSaga() {
  try {
    const isFirstLaunch = call(validateIsFirstLaunch);
    const loginUser = yield call(getLoginUser);
    console.log("function*initialAppSaga -> loginUser", loginUser)
    const database = yield call(initSQL, isFirstLaunch);
    const resAction = true 
      ? okInitial({ database })
      : errInitial();

    yield put(resAction);
    yield put({
      type: types.SET_LOGIN_USER,
      payload: loginUser
    });
  }catch(error) {
    const errorAction = errInitial(error);
    yield put(errorAction);
  }
}

