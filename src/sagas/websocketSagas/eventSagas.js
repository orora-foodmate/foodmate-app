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

    console.log("function*createEventByWebsocketSaga -> payload", payload)
    const eventItem  = parseEventItem(payload);
    console.log("function*createEventByWebsocketSaga -> eventItem", eventItem)
    yield database.events.insert(eventItem);

    yield put(okCreate());
  } catch (error) {
    const errorAction = errCreate(error);
    yield put(errorAction);
  }
}
