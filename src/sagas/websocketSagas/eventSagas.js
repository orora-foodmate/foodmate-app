import { put, select } from 'redux-saga/effects';
import types from '~/constants/actionTypes';
import isEmpty from 'lodash/isEmpty';
import { parseEventItem } from '~/utils/utils';

const okCreate = (payload) => ({
  type: types.CREATE_EVENT_BY_WEBSOCKET_SUCCESS,
  payload,
});

const errCreate = ({ message }) => {
  return {
    type: types.CREATE_EVENT_BY_WEBSOCKET_ERROR,
    payload: {
      message,
    },
  };
};

export function* createEventByWebsocketSaga({ payload = {} }) {
  console.log("function*createEventByWebsocketSaga -> createEventByWebsocketSaga")
  try {
    const { setting } = yield select(({ setting }) => ({
      setting,
    }));
    const database = setting.get('database');

    if (isEmpty(database)) {
      yield put(okCreate());
      return;
    }

    const eventItem  = parseEventItem(payload);
    yield database.events.insert(eventItem);

    yield put(okCreate());
  } catch (error) {
    const errorAction = errCreate(error);
    yield put(errorAction);
  }
}

const okUpdate = (payload) => ({
  type: types.CREATE_EVENT_BY_WEBSOCKET_SUCCESS,
  payload,
});

const errUpdate = ({ message }) => {
  return {
    type: types.CREATE_EVENT_BY_WEBSOCKET_ERROR,
    payload: {
      message,
    },
  };
};

export function* updateEventByWebsocketSaga({ payload = {} }) {
  console.log('🚀 ~ file: eventSagas.js ~ line 58 ~ function*updateEventByWebsocketSaga ~ payload', JSON.stringify(payload))
  try {
    const { setting } = yield select(({ setting }) => ({
      setting,
    }));
    const database = setting.get('database');

    if (isEmpty(database)) {
      yield put(okUpdate());
      return;
    }

    // const eventItem  = parseEventItem(payload);
    // yield database.events.insert(eventItem);

    yield put(okUpdate());
  } catch (error) {
    const errorAction = errUpdate(error);
    yield put(errorAction);
  }
}
