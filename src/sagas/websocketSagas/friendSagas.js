import { put, select } from 'redux-saga/effects';
import types from '~/constants/actionTypes';
import isEmpty from 'lodash/isEmpty';
import isNull from 'lodash/isNull';
import { parseISOString } from '~/helper/dateHelper';

const okApprove = (payload) => ({
  type: types.APPROVE_FRIEND_BY_WEBSOCKET_SUCCESS,
  payload,
});

const errApprove = ({ message }) => {
  return {
    type: types.APPROVE_FRIEND_BY_WEBSOCKET_ERROR,
    payload: {
      message,
    },
  };
};

export function* approveFriendByWebsocketSaga({ payload = {} }) {
  try {
    const { setting } = yield select(({ setting }) => ({
      setting,
    }));
    const database = setting.get('database');

    if (isEmpty(database)) {
      yield put(okApprove());
      return;
    }
    const friend = yield database.friends
      .findOne()
      .where('friendId')
      .eq(payload.friendId)
      .exec();

    yield friend.atomicUpdate(oldData => {
      oldData.status = 2;
      return oldData;
    });

    yield put(okApprove());
  } catch (error) {
    const errorAction = errApprove(error);
    yield put(errorAction);
  }
}


const okInvite = (payload) => ({
  type: types.INVITE_FRIEND_BY_WEBSOCKET_SUCCESS,
  payload,
});

const errInvite = ({ message }) => {
  return {
    type: types.INVITE_FRIEND_BY_WEBSOCKET_ERROR,
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
      yield put(okInvite());
      return;
    }

    yield database.friends.insert({
      ...payload,
      createAt: parseISOString(payload.createAt),
      updateAt: parseISOString(payload.updateAt),
    });

    yield put(okInvite());
  } catch (error) {
    const errorAction = errInvite(error);
    yield put(errorAction);
  }
}


const okReject = (payload) => ({
  type: types.REJECT_FRIEND_BY_WEBSOCKET_SUCCESS,
  payload,
});

const errReject = ({ message }) => {
  return {
    type: types.REJECT_FRIEND_BY_WEBSOCKET_ERROR,
    payload: {
      message,
    },
  };
};

export function* rejectFriendByWebsocketSaga({ payload = {} }) {
  try {
    const { setting } = yield select(({ setting }) => ({
      setting,
    }));
    const database = setting.get('database');

    if (isEmpty(database)) {
      yield put(okReject());
      return;
    }
    const friend = yield database.friends
      .findOne()
      .where('friendId')
      .eq(payload.friendId)
      .exec();

    if (!isNull(friend)) {
      yield friend.remove();
    }

    yield put(okReject());
  } catch (error) {
    const errorAction = errReject(error);
    yield put(errorAction);
  }
}