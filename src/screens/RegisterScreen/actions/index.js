import * as types from './actionTypes';

export const updateStateAction = (payload) => ({
  type: types.UPDATE_STATE,
  payload,
});

export const createUserAction = (payload) => ({
  type: types.CREATE_USER,
})