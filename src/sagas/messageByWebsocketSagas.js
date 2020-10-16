import { put, call, select } from 'redux-saga/effects';
import types from '~/constants/actionTypes';
import { addMessageResult, getMessagesResult } from '~/apis/api';
import isEmpty from 'lodash/isEmpty';
import isNull from 'lodash/isNull';
import addSeconds from 'date-fns/addSeconds';
import format from 'date-fns/format';


const okAdd = () => ({
  type: types.ADD_MESSAGE_BY_WEBSOCKET_SUCCESS,
});

const errAdd = ({ message }) => {
  return {
    type: types.ADD_MESSAGE_BY_WEBSOCKET_ERROR,
    payload: {
      message,
    },
  };
};

export function* addMessageByWebsocketSaga({ payload }) {
  try {
    const { setting } = yield select(({ auth, setting }) => ({ auth, setting }));
    const database = setting.get('database');
    
    if (isEmpty(database)) {
      yield put(okAdd());
      return;
    }
    
    const newMessage = {
      ...payload,
      createAt: new Date(payload.createAt).toISOString(),
    }
    yield database.messages.insert(newMessage);
    
    yield put(okAdd());
  } catch (error) {
    const errorAction = errAdd(error);
    yield put(errorAction);
  }
}

