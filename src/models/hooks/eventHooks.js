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

export const useEventDetailHook = function (database, id) {
  const [event, setEvent] = useState([]);
  useMemo(() => {
    if(database) {
      const sub = database.events.findOne().where('id').eq(id).$.subscribe(item => {
        setEvent(item);
      });
      return () => sub.unsubscribe();
    }   
  }, [database, id]);
  return event;
}