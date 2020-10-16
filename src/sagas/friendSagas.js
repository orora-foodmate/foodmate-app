import { put, call, select } from 'redux-saga/effects';
import types from '~/constants/actionTypes';
import { getFriendsResult, inviteFriendResult } from '~/apis/api';
import isEmpty from 'lodash/isEmpty';
import pick from 'lodash/pick';
import format from 'date-fns/format';
import addSeconds from 'date-fns/addSeconds';


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

export function* getFriendsSaga({ payload = {} }) {
  try {
    const { auth, setting } = yield select(({ auth, setting }) => ({ auth, setting }));
    const token = auth.get('token');
    const database = setting.get('database');

    if (isEmpty(token) || isEmpty(database)) {
      yield put(okGet());
      return;
    }

    const customHeaders = {
      Authorization: `Bearer ${auth.get('token')}`
    };

    const friend = yield database.friends.findOne().sort('updateAt').exec();
    const queryObject = isEmpty(friend)
      ? payload
      : { ...payload, updateAt: format(addSeconds(new Date(friend.updateAt), 1), 'yyyy-MM-dd HH:mm:ss') }

    const { result } = yield call(getFriendsResult, customHeaders, queryObject);
    const items = result.data.friends.map(f => {
      const item = pick(f, ['id', 'status', 'creator', 'users']);
      item.createAt = new Date(f.createAt).toISOString();
      item.updateAt = new Date(f.updateAt).toISOString();
      return item;
    });
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

const errInvite = ({ message }) => {
  return {
    type: types.INVITE_FRIEND_ERROR,
    payload: {
      message,
    },
  };
};

export function* inviteFriendSaga({ payload }) {
  try {
    const { auth, setting } = yield select(({ auth, setting }) => ({ auth, setting }));
    const token = auth.get('token');
    const database = setting.get('database');

    if (isEmpty(token) || isEmpty(database)) {
      yield put(okInvite());
      return;
    }

    const customHeaders = {
      Authorization: `Bearer ${auth.get('token')}`
    };
    
    // const { result } = yield call(inviteFriendResult, customHeaders, payload);
    const data = {"users":["5f898ff8f5a2442d02e38410","5f7432fdd2048d1301677be3"],"status":1,"creator":"5f7432fdd2048d1301677be3","createAt":"2020-10-16 21:11:01.432","updateAt":"2020-10-16 21:11:01.433","id":"5f899be5f5a2442d02e38412"};
    

    yield put(okInvite());
  } catch (error) {
    const errorAction = errInvite(error);
    yield put(errorAction);
  }
}

