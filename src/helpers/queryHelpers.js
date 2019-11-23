import { Q } from '@nozbe/watermelondb';
import reduce from 'lodash/reduce';

export const getQueryArray = (query, page=1, size=10) => {
  const queryArray = reduce(
    query,
    (result, value, key) => {
      return [...result, Q.where(key, value)];
    },
    []
  );
  return queryArray;
}
