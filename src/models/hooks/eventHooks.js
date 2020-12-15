import React, { useState, useEffect } from 'react';

export const useEventsHook = function (database) {
  const [events, setEvents] = useState([]);
  useEffect(() => {
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
  const [event, setEvent] = useState({});
  useEffect(() => {
    console.log('🚀 ~ file: eventHooks.js ~ line 19 ~ useEffect ~ useEffect', id)
    if(database) {
      const sub = database.events.findOne().where('id').eq(id).$.subscribe(item => {
      console.log('🚀 ~ file: eventHooks.js ~ line 21 ~ sub ~ item', item)
        setEvent(item);
      });
      return () => sub.unsubscribe();
    }   
  }, []);
  console.log('🚀 ~ file: eventHooks.js ~ line 30 ~ useEventDetailHook ~ event', event)
  return event;
}
