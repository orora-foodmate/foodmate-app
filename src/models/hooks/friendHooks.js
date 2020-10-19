import cloneDeep from 'lodash/cloneDeep';
import { useState, useEffect } from 'react';

const DEFAULT_SETION_DATA = [
  {
    title: '審核中',
    data: [],
  },
  {
    title: '好友',
    data: [],
  },
];


export const useFriendsHook = (database) => (query = {}, options = {}) => {
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    console.log('useFriendsHook -> database.friends', database.friends)
    const sub = database.friends.find(query, options).$.subscribe(friends => {
      const result = items.reduce((rs, item) => {
        const index = item.status === 2 ? 1 : 0;

        rs[index].data.push(item);
        return rs;
      }, cloneDeep(DEFAULT_SETION_DATA));
      setFriends(result);
    });
    return () => sub.unsubscribe();
  }, []);
  return friends;
};
