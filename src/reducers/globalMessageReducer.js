import * as types from '../constants/actionTypes';
import { globalMessageState } from './initialState';

export default function reducer(globalMessage = globalMessageState, { type, payload }) {
  switch (type) {
    default:
      return globalMessage;
  }
}
