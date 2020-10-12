import { put, call, select } from 'redux-saga/effects';
import types from '~/constants/actionTypes';
import { getRoomsResult } from '~/apis/api';
import isEmpty from 'lodash/isEmpty';
import pick from 'lodash/pick';
import format from 'date-fns/format';
import addSeconds from 'date-fns/addSeconds';

const okGet = () => ({
  type: types.GET_ROOMS_SUCCESS,
});

const errGet = ({ message }) => {
  return {
    type: types.GET_ROOMS_ERROR,
    payload: {
      message,
    },
  };
};

export function* getRoomsSaga() {
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

    const room = yield database.rooms.findOne().sort('updateAt').exec();
    const queryObject = isEmpty(room)
      ? {}
      : { updateAt: format(addSeconds(new Date(room.updateAt), 1), 'yyyy-MM-dd HH:mm:ss') }

    const { result } = yield call(getRoomsResult, customHeaders, queryObject);
    console.log('function*getRoomsSaga -> result', result)

    const items = result.data.rooms.map(r => {
      const item = pick(r, ['createAt', 'updateAt', 'status', 'creator', 'users'])
      item.id = r._id;
      return item;
    });
    yield database.rooms.bulkInsert(items);

    yield put(okGet());
  } catch (error) {
    const errorAction = errGet(error);
    yield put(errorAction);
  }
}
