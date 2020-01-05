import {UPDATE_STATE, createUserActionTypes} from './actionTypes';
import { createUserResult } from '../apis';

export const updateStateAction = (payload) => ({
  type: types.UPDATE_STATE,
  payload,
});

export const createUserAction = (payload) => ({
  types: createUserActionTypes,
  promise: createUserResult,
  payload,
})