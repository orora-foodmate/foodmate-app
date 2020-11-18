import {put, call, select} from 'redux-saga/effects';
import types from '~/constants/actionTypes';
import isFunction from 'lodash/isFunction';
import {
  createEventResult,
} from '~/apis/api';
import { parseISOString } from '~/helper/dateHelper';

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
    
    yield database.events.insert({
      ...result.data,
      createAt: parseISOString(result.data.createAt),
      updateAt: parseISOString(result.data.updateAt),
      finalReviewAt: parseISOString(result.data.finalReviewAt),
      datingAt: parseISOString(result.data.datingAt),
    });
    yield put(okCreate());
    if(isFunction(onSuccess)) onSuccess();
    push('EventDetail', {passProps: {eventId: result.data.id}});
  } catch (error) {
    const errorAction = errCreate(error);
    yield put(errorAction);
  }
}
