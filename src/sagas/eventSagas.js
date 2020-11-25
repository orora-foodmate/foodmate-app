import {put, call, select} from 'redux-saga/effects';
import types from '~/constants/actionTypes';
import isFunction from 'lodash/isFunction';
import {
  createEventResult,
  joinEventResult,
} from '~/apis/api';
import { parseEventItem } from '~/utils/utils';

const okCreate = (payload) => ({
  type: types.CREATE_EVENT_SUCCESS,
  payload,
});

const errCreate = ({message}) => {
  return {
    type: types.CREATE_EVENT_ERROR,
    payload: {
      message,
    },
  };
};

export function* createEventSaga({payload = {}}) {
  try {
    const { push, onSuccess, ...createdPayload } = payload;

    const {auth, setting} = yield select(({auth, setting}) => ({
      auth,
      setting,
    }));
    const database = setting.get('database');

    const customHeaders = {
      Authorization: `Bearer ${auth.get('token')}`,
    };

    const {result} = yield call(createEventResult, customHeaders, createdPayload);
    
    yield database.events.insert(parseEventItem(result.data));
    yield put(okCreate());
    if(isFunction(onSuccess)) onSuccess();
  } catch (error) {
    alert(error.message)
    const errorAction = errCreate(error);
    yield put(errorAction);
  }
}


const okJoin = (payload) => ({
  type: types.JOIN_EVENT_SUCCESS,
  payload,
});

const errJoin = ({message}) => {
  return {
    type: types.JOIN_EVENT_ERROR,
    payload: {
      message,
    },
  };
};

export function* joinEventSaga({payload = {}}) {
  console.log("function*joinEventSaga -> payload", payload)
  try {
    const {auth, setting} = yield select(({auth, setting}) => ({
      auth,
      setting,
    }));
    const database = setting.get('database');

    const customHeaders = {
      Authorization: `Bearer ${auth.get('token')}`,
    };

    const {result} = yield call(joinEventResult, customHeaders, payload);
    
    const event = yield database.events.findOne().where('id').eq(payload.eventId);
    event.users = result.data.users;
    yield event.save();

    yield put(okJoin());
  } catch (error) {
    const errorAction = errJoin(error);
    yield put(errorAction);
  }
}