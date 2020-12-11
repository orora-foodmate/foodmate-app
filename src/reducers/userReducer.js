import types from '../constants/actionTypes';
import {memberState} from './initialState';

export default function reducer(member = memberState, {type, payload}) {
  switch (type) {
    case types.GET_MEMBER_DETAIL_SUCCESS:
      return member.update('user', (user) => user.merge(payload));
    case types.GET_MEMBER_DETAIL_ERROR:
    case types.GET_MEMBER_DETAIL:
    default:
      return member;
  }
}
