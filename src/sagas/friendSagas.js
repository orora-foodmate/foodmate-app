import {put, call, select} from 'redux-saga/effects';
import types from '~/constants/actionTypes';
import {getFriendsResult} from '~/apis/api';
import isEmpty from 'lodash/isEmpty';
import pick from 'lodash/pick';
import format from 'date-fns/format';

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

    const friend = yield database.friends.findOne().sort('updateAt').exec();
    const queryObject = isEmpty(friend)
      ? payload
      : {...payload, updateAt: format(new Date(friend.updateAt), 'yyyy-MM-dd HH:mm:ss')}
    const {result} = yield call(getFriendsResult, customHeaders, queryObject);
    const items = result.data.friends.map(f => {
      const item = pick(f, ['createAt', 'updateAt', 'status', 'creator', 'users'])
      item.id = f._id;
      return item;
    })
    yield database.friends.bulkInsert(items);

    yield put(okGet());
  } catch (error) {
    console.log('function*getFriendsSaga -> error', error)
    const errorAction = errGet(error);
    yield put(errorAction);
  }
}
