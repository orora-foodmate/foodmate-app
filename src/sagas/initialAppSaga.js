import types from '../constants/actionTypes';
import { call, put } from 'redux-saga/effects';
import { initSQL } from '~/models';
import { getLoginUser, validateIsFirstLaunch } from '~/helper/authHelpers';

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
    console.log(1)
    const isFirstLaunch = call(validateIsFirstLaunch);
    console.log(2)
    const loginUser = yield call(getLoginUser);
    console.log(3)
    const database = yield call(initSQL, isFirstLaunch);
    console.log('function*initialAppSaga -> database', database)
    const resAction = true 
      ? okInitial({ database })
      : errInitial();

    yield put(resAction);
    yield put({
      type: types.SET_LOGIN_USER,
      payload: loginUser
    });
  }catch(error) {
    console.log('function*initialAppSaga -> error', error)
    const errorAction = errInitial(error);
    yield put(errorAction);
  }
}

