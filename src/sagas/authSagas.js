import { put, call, select } from 'redux-saga/effects';
import isEmpty from 'lodash/isEmpty';
import types from '~/constants/actionTypes';
import { loginResult, registeUserResult } from '~/apis/api';
import { saveLoginUser, removeLoginUser } from '~/helper/authHelpers';
import socketClusterHelper from '~/helper/socketClusterHelpers';
import rootNavigator from '~/navigation/rootNavigator';
import noAuthNavigator from '~/navigation/noAuthNavigator';
import { destoryDatabase, initialCollections } from '~/models';

const okRegister = (payload) => ({
  type: types.REGISTER_USER_SUCCESS,
  payload,
});

const errRegister = ({ message, status }) => {
  return {
    type: types.REGISTER_USER_ERROR,
    payload: {
      message,
    }
  };
};

export function* registeUserSaga({ payload }) {
  const { push, ...submitPayload } = payload;
  try {
    const {result} = yield call(registeUserResult, submitPayload);
    push('Nickname');

    yield put(okRegister());
  } catch (error) {
    const errorAction = errRegister(error);
    yield put(errorAction);
  }
}

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
    const loginUser = result.data;
    
    const socket = socketClusterHelper.initialClient(loginUser.token);

    yield call(saveLoginUser, loginUser);
    yield put(okLogin({ ...loginUser, socket }));
    rootNavigator();
  } catch (error) {
    const errorAction = errLogin(error);
    yield put(errorAction);
  }
}

const okLogout = (payload) => ({
  type: types.LOGOUT_SUCCESS,
  payload,
});

const errLogout = ({ message, status }) => {
  return {
    type: types.LOGOUT_ERROR,
    payload: {
      message,
    }
  };
};

export function* logoutSaga({ payload }) {
  try {
    const { setting } = yield select(({ auth, setting }) => ({ auth, setting }));
    const database = setting.get('database');

    yield call(socketClusterHelper.close);
    yield call(removeLoginUser);

    if (!isEmpty(database)) {
      yield destoryDatabase(database);
      yield initialCollections(database);
    }

    noAuthNavigator();
    yield put(okLogout());
  } catch (error) {
    const errorAction = errLogout(error);
    yield put(errorAction);
  }
}
