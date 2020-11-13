import React, { useState, useMemo } from 'react';

export const useEventsHook = function (database, query = undefined, options = undefined) {
  const [friends, setEvents] = useState([]);
  useMemo(() => {
    if(database) {
      const sub = database.friends.find(query).$.subscribe(items => {
        setEvents(items);
      });
      return () => sub.unsubscribe();
    }   
  }, [database, query, options]);
  return friends;
};
