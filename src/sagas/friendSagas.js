import { put, call } from 'redux-saga/effects';
import types from '~/constants/actionTypes';

const okGet = (payload) => ({
  type: types.GET_FRIENDS_SUCCESS,
  payload,
});

const errGet = ({ message, status }) => {
  return {
    type: types.GET_FRIENDS_ERROR,
    payload: {
      message,
    }
  };
};

export function* getFriendsSaga({ payload }) {
  console.log("function*getFriendsSaga -> getFriendsSaga")
  try {
    
    yield put(okGet());
  } catch (error) {
    const errorAction = errGet(error);
    yield put(errorAction);
  }
}