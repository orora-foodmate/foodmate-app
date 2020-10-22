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

const errGet = ({message}) => {
  return {
    type: types.GET_FRIENDS_ERROR,
    payload: {
      message,
    },
  };
};

export function* getFriendsSaga({payload = {}}) {
  try {
    const {auth, setting} = yield select(({auth, setting}) => ({
      auth,
      setting,
    }));
    const token = auth.get('token');
    const database = setting.get('database');

    if (isEmpty(token) || isEmpty(database)) {
      yield put(okGet());
      return;
    }

    const customHeaders = {
      Authorization: `Bearer ${auth.get('token')}`,
    };

    const friend = yield database.friends.findOne().sort('updateAt').exec();
    const queryObject = isEmpty(friend)
      ? payload
      : {
          ...payload,
          updateAt: format(
            addSeconds(new Date(friend.updateAt), 1),
            'yyyy-MM-dd HH:mm:ss'
          ),
        };

    const {result} = yield call(getFriendsResult, customHeaders, queryObject);

    const items = result.data.friends.map((f) => {
      const createAt = parseISOString(f.createAt);
      const updateAt = parseISOString(f.updateAt);
      return {
        ...pick(f, [
          'id',
          'avatar',
          'creator',
          'status',
          'account',
          'name',
          'room',
          'friendId',
        ]),
        createAt,
        updateAt,
      }
    });

    console.log('function*getFriendsSaga -> items', items);
    yield database.friends.bulkInsert(items);

    yield put(okGet());
  } catch (error) {
    console.log('function*getFriendsSaga -> error', error)
    const errorAction = errGet(error);
    yield put(errorAction);
  }
}

const okInvite = (payload) => ({
  type: types.INVITE_FRIEND_SUCCESS,
  payload,
});

const errInvite = ({message}) => {
  return {
    type: types.INVITE_FRIEND_ERROR,
    payload: {
      message,
    },
  };
};

export function* inviteFriendSaga({payload}) {
  try {
    const {auth, setting} = yield select(({auth, setting}) => ({
      auth,
      setting,
    }));
    const token = auth.get('token');
    const database = setting.get('database');

    if (isEmpty(token) || isEmpty(database)) {
      yield put(okInvite());
      return;
    }

    const customHeaders = {
      Authorization: `Bearer ${auth.get('token')}`,
    };

    const {result} = yield call(inviteFriendResult, customHeaders, payload);
    
    yield database.friends.insert({
      ...result.data,
      createAt: parseISOString(result.data.createAt),
      updateAt: parseISOString(result.data.updateAt),
    });
    
    yield put(okInvite());
  } catch (error) {
    console.log('function*inviteFriendSaga -> error', error)
    const errorAction = errInvite(error);
    yield put(errorAction);
  }
}

const okReject = (payload) => ({
  type: types.REJECT_INVITE_FRIEND_SUCCESS,
  payload,
});

const errReject = ({message}) => {
  return {
    type: types.REJECT_INVITE_FRIEND_ERROR,
    payload: {
      message,
    },
  };
};

export function* rejectInviteFriendSaga({payload}) {
  try {
    const {auth, setting} = yield select(({auth, setting}) => ({
      auth,
      setting,
    }));
    const token = auth.get('token');
    const database = setting.get('database');

    if (isEmpty(token) || isEmpty(database)) {
      yield put(okReject());
      return;
    }

    const customHeaders = {
      Authorization: `Bearer ${auth.get('token')}`,
    };

    yield call(rejectInviteFriendResult, customHeaders, payload);
    console.log('function*rejectInviteFriendSaga -> payload', payload)
    const friend = yield database.friends
      .findOne()
      .where('friendId')
      .eq(payload.friendId)
      .exec();

      console.log('function*rejectInviteFriendSaga -> friend', friend)
    yield friend.remove();

    yield put(okReject());
  } catch (error) {
    console.log('function*rejectInviteFriendSaga -> error', error)
    const errorAction = errReject(error);
    yield put(errorAction);
  }
}

const okApprove = (payload) => ({
  type: types.APPROVE_INVITE_FRIEND_SUCCESS,
  payload,
});

const errApprove = ({message}) => {
  return {
    type: types.APPROVE_INVITE_FRIEND_ERROR,
    payload: {
      message,
    },
  };
};

export function* approveInviteFriendSaga({payload}) {
  try {
    const {auth, setting} = yield select(({auth, setting}) => ({
      auth,
      setting,
    }));
    const token = auth.get('token');
    const database = setting.get('database');

    if (isEmpty(token) || isEmpty(database)) {
      yield put(okApprove());
      return;
    }

    const customHeaders = {
      Authorization: `Bearer ${auth.get('token')}`,
    };

    yield call(approveInviteFriendResult, customHeaders, payload);

    const friend = yield database.friends.findOne().where('friendId').eq(payload.friendId);
    yield friend.update({$set: {status: 2}});

    yield put(okApprove());
  } catch (error) {
    const errorAction = errApprove(error);
    yield put(errorAction);
  }
}
