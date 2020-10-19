import cloneDeep from 'lodash/cloneDeep';
import React, { useState, useEffect, useMemo } from 'react';

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


export const useFriendsHook = function (database, query = undefined, options = undefined) {
  const [friends, setFriends] = useState([]);
  useMemo(() => {
    if(database) {
      const sub = database.friends.find(query).$.subscribe(items => {
        const result = items.reduce((rs, item) => {
          const index = item.status === 2 ? 1 : 0;
  
          rs[index].data.push(item);
          return rs;
        }, cloneDeep(DEFAULT_SETION_DATA));
        setFriends(result);
      });
      return () => sub.unsubscribe();
    }   
  }, [database, query, options]);
  return friends;
};

export const useFriendRoomsHook = (database) => {
  const [rooms, setRooms] = useState([]);
  useMemo(() => {
    if(database) {
      const sub = database.friends.find().where('status').eq(2).$.subscribe(items => {
        setRooms(items);
      });
      return () => sub.unsubscribe();
    }   
  }, [database]);
  return rooms;
}