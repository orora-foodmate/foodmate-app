import {put, call, select} from 'redux-saga/effects';
import types from '~/constants/actionTypes';
import {
  getFriendsResult,
  inviteFriendResult,
  rejectInviteFriendResult,
  approveInviteFriendResult,
} from '~/apis/api';
import isEmpty from 'lodash/isEmpty';
import pick from 'lodash/pick';
import format from 'date-fns/format';
import addSeconds from 'date-fns/addSeconds';
import { parseISOString } from '~/helper/dateHelper';

const okGet = (payload) => ({
  type: types.GET_FRIENDS_SUCCESS,
  payload,
});

const errGet = ({ message }) => {
  return {
    type: types.GET_FRIENDS_ERROR,
    payload: {
      message,
    },
  };
};

export function* inviteFriendByWebsocketSaga({ payload = {} }) {
  try {
    const { setting } = yield select(({ setting }) => ({
      setting,
    }));
    const database = setting.get('database');

    if (isEmpty(database)) {
      yield put(okGet());
      return;
    }

    yield database.friends.insert({
      ...payload,
      createAt: parseISOString(payload.createAt),
      updateAt: parseISOString(payload.updateAt),
    });

    yield put(okGet());
  } catch (error) {
    const errorAction = errGet(error);
    yield put(errorAction);
  }
}