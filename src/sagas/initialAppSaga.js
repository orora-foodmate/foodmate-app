import types from '~/constants/actionTypes';
import socketClusterClient from 'socketcluster-client';
import Config from '~/constants/envConfig';
import { call, put } from 'redux-saga/effects';
import { initSQL } from '~/models';
import { getLoginUser, validateIsFirstLaunch } from '~/helper/authHelpers';

const okInitial = (payload) => ({
  type: types.INITIAL_APP_SUCCESS,
  payload,
});

const errInitial = ({ message }) => ({
  type: types.INITIAL_APP_ERROR,
  payload: { message },
});

export function* initialAppSaga() {
  try {
    const isFirstLaunch = yield call(validateIsFirstLaunch);
    const loginUser = yield call(getLoginUser);
    const database = yield call(initSQL, isFirstLaunch);
    const socket = socketClusterClient.create({
      secure: false,
      hostname: Config.hostname,
      port: Config.port,
      authTokenName: 'socketcluster.authToken',
      autoReconnectOptions: {
        initialDelay: 10000, //milliseconds
        randomness: 10000, //milliseconds
        multiplier: 1.5, //decimal
        maxDelay: 60000 //milliseconds
      },
      authEngine: {
        _internalStorage: {
          "socketcluster.authToken": loginUser.token
        },
        isLocalStorageEnabled: true,
        saveToken: (name, token, options) => {
          console.log('function*initialAppSaga -> token', token)
          console.log('function*initialAppSaga -> name', name)
          this._internalStorage[name] = token;
          return Promise.resolve(token);
        },
        removeToken: function (name) {
          const loadPromise = this.loadToken(name);
          delete this._internalStorage[name];
          return loadPromise;
        },
        loadToken: function (name) {
          const token = this._internalStorage[name] || null;
          return Promise.resolve(token);
        }
      }
    });
    console.log('function*initialAppSaga -> socket', socket)
    const resAction = true ? okInitial({ database }) : errInitial();
    yield put({
      type: types.SET_LOGIN_USER,
      payload: loginUser,
    });

    yield put(resAction);
  } catch (error) {
    const errorAction = errInitial(error);
    yield put(errorAction);
  }
}
