import types from '../constants/actionTypes';
import {searchState} from './initialState';

export default function reducer(search = searchState, {type, payload}) {
  switch (type) {
    case types.REJECT_INVITE_FRIEND_SUCCESS:
      return search.update('user', (user) => user.merge({status: 0}));
    case types.INVITE_FRIEND_SUCCESS:
      return search.update('user', (user) => user.merge({status: 1}));
    case types.GET_USER_BY_ID_SUCCESS:
      return search.update('user', (user) => user.merge(payload));
    case types.GET_USER_BY_ID:
    case types.GET_USER_BY_ID_ERROR:
    case types.INVITE_FRIEND:
    case types.INVITE_FRIEND_ERROR:
    case types.REJECT_INVITE_FRIEND:

    case types.REJECT_INVITE_FRIEND_ERROR:
    default:
      return search;
  }
}
