import React, { useState, useMemo } from 'react';

export const useEventsHook = function (database) {
  const [events, setEvents] = useState([]);
  useMemo(() => {
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
  useMemo(() => {
    if(database) {
      const sub = database.events.findOne().where('id').eq(id).$.subscribe(item => {
        setEvent(item.toJSON());
      });
      return () => sub.unsubscribe();
    }   
  }, [database, id]);
  return event;
}

export const useEventRoomsHook = (database, authUserId) => {
  const [rooms, setRooms] = useState([]);
  useMemo(() => {
    if(database) {
      const sub = database.events.find().where('creator.id').eq(authUserId).$.subscribe(items => {
        const roomItems = items.map(item => ({
          title: item.title,
          subTitle: item.creator.name,
          roomId: item.room,
          avatar: item.logo,
          updateAt: item.updateAt,
        }));
        setRooms(roomItems);
      });
      return () => sub.unsubscribe();
    }   
  }, [database]);
  return rooms;
}
