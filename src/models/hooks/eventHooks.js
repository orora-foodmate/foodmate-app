import React, { useState, useMemo } from 'react';

export const useEventsHook = function (database) {
  const [events, setEvents] = useState([]);
  useMemo(() => {
    if(database) {
      const sub = database.events.find().$.subscribe(items => {
        setEvents(items);
      });
      return () => sub.unsubscribe();
    }   
  }, [database]);
  return events;
};
