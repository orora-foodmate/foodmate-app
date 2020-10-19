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

    const items = result.data.friends.map((f) => ({
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
      createAt: new Date(f.createAt).toISOString(),
      updateAt: new Date(f.updateAt).toISOString(),
    }));

    console.log('function*getFriendsSaga -> items', items);
    yield database.friends.bulkInsert(items);

    yield put(okGet());
  } catch (error) {
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

    yield call(inviteFriendResult, customHeaders, payload);

    yield put(okInvite());
  } catch (error) {
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
    const friend = yield database.friends
      .findOne()
      .where('friendId')
      .eq(payload.friendId)
      .exec();

    yield friend.remove();

    yield put(okReject());
  } catch (error) {
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

    const friend = yield database.friends.findOne({id: payload.friendId});
    yield friend.updateStatus(2);

    yield put(okApprove());
  } catch (error) {
    const errorAction = errApprove(error);
    yield put(errorAction);
  }
}
