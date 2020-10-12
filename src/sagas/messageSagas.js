import { put, call, select } from 'redux-saga/effects';
import types from '~/constants/actionTypes';
import { addMessageResult } from '~/apis/api';
import isEmpty from 'lodash/isEmpty';

const okAdd = () => ({
  type: types.ADD_MESSAGE_SUCCESS,
});

const errAdd = ({ message }) => {
  return {
    type: types.ADD_MESSAGE_ERROR,
    payload: {
      message,
    },
  };
};

export function* addMessageSaga({ payload }) {
  try {
    const { auth, setting } = yield select(({ auth, setting }) => ({ auth, setting }));
    const token = auth.get('token');
    const database = setting.get('database');
    
    if (isEmpty(token) || isEmpty(database)) {
      yield put(okAdd());
      return;
    }
    
    const customHeaders = {
      Authorization: `Bearer ${auth.get('token')}`
    };
    
    const { result } = yield call(addMessageResult, customHeaders, payload);
    console.log("function*addMessageSaga -> result", result)

    yield put(okAdd());
  } catch (error) {
    console.log("function*addMessageSaga -> error", error)
    const errorAction = errAdd(error);
    yield put(errorAction);
  }
}
