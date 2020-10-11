import {put, call, select} from 'redux-saga/effects';
import types from '~/constants/actionTypes';
import {getFriendsResult} from '~/apis/api';
import isEmpty from 'lodash/isEmpty';

const okGet = (payload) => ({
  type: types.GET_FRIENDS_SUCCESS,
  payload,
});

const errGet = ({message, status}) => {
  return {
    type: types.GET_FRIENDS_ERROR,
    payload: {
      message,
    },
  };
};

export function* getFriendsSaga({payload}) {
  console.log('function*getFriendsSaga -> getFriendsSaga');
  try {
    const {auth, setting} = yield select(({auth, setting}) => ({auth, setting}));
    const token = auth.get('token');
    const database = setting.get('database');

    if(isEmpty(token) || isEmpty(database)) {
      yield put(okGet());
      return;
    }
    
    const customHeaders = {
      Authorization: `Bearer ${auth.get('token')}`
    };

    const {result} = yield call(getFriendsResult, customHeaders, payload);
    yield database.friends.insert(result.data.friends[0]);
    // yield call(database.friends.insert, result.data.friends[0]);

    yield put(okGet());
  } catch (error) {
    const errorAction = errGet(error);
    yield put(errorAction);
  }
}
