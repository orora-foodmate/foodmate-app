import { put, select, call } from 'redux-saga/effects';
import isEmpty from 'lodash/isEmpty';
import types from '~/constants/actionTypes';
import rootNavigator from '~/navigation/rootNavigator';
import { getUserByIdResult, updateUserResult } from '~/apis/api';

const okGet = (payload) => ({
  type: types.GET_USER_BY_ID_SUCCESS,
  payload,
});

const errGet = ({ message }) => {
  return {
    type: types.GET_USER_BY_ID_ERROR,
    payload: {
      message,
    },
  };
};

export function* getUserByIdSaga({ payload }) {
  try {
    const { auth, setting } = yield select(({ auth, setting }) => ({ auth, setting }));
    const token = auth.get('token');
    const database = setting.get('database');

    if (isEmpty(token) || isEmpty(database)) {
      yield put(okGet());
      return;
    }

    const customHeaders = {
      Authorization: `Bearer ${auth.get('token')}`
    };
    const { result } = yield call(getUserByIdResult, customHeaders, payload);
    
    yield put(okGet(result.data));
  } catch (error) {
    const errorAction = errGet(error);
    yield put(errorAction);
  }
}

const okUpdate = payload => ({
  type: types.INIT_USERNAME_SUCCESS,
  payload,
});

const errorUpdate = payload => ({
  type: types.INIT_USERNAME_ERROR,
  payload
})

export function* updateUserSaga({ payload }) {
  try {
    const { auth } = yield select(({ auth, setting }) => ({ auth, setting }));
    
    const customHeaders = {
      Authorization: `Bearer ${auth.get('token')}`
    };
    const { result } = yield call(updateUserResult, customHeaders, payload);

    yield put(okUpdate(result.data));
    rootNavigator();
  }catch(error){
    const errorAction = errorUpdate(error);
    yield put(errorAction);
  }
}
