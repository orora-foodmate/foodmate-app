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
    if(database) {
      const sub = database.events.findOne().where('id').eq(id).$.subscribe(item => {
      console.log("useEventDetailHook -> item", item)
      console.log("useEventDetailHook -> setEvent", setEvent)
        setEvent(item);
      });
      return () => sub.unsubscribe();
    }   
  }, [database, id]);
  return event;
}