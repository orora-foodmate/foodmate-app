import React, { useState, useEffect } from 'react';

export const useEventsHook = function (database) {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    if(database) {
      const sub = database.events.find().$.subscribe(items => {
        const eventItems = items.map(item => item.toJSON());
        setEvents(eventItems);
      });
      return () => sub.unsubscribe();
    }   
  }, [database]);
  return events;
};

export const useEventDetailHook = function (database, id) {
  const [event, setEvent] = useState({});
  useEffect(() => {
    if(database) {
      const sub = database.events.findOne().where('id').eq(id).$.subscribe(item => {
        setEvent(item.toJSON());
      });
      return () => sub.unsubscribe();
    }   
  }, [database, id]);
  return event;
}
