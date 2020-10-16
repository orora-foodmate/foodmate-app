import types from '../constants/actionTypes';
import { searchState } from './initialState';

export default function reducer(search = searchState, { type, payload }) {
  switch (type) {
    case types.GET_USER_BY_ID_SUCCESS:
      return search.update('user', user => user.merge(payload));
    case types.GET_USER_BY_ID:    
    case types.GET_USER_BY_ID_ERROR:
    default:
      return search;
  }
}
