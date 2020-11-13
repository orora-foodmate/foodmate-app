import React from 'react';
import { View, Text} from 'react-native';
import { useEvents } from '~/models';

const EventsScreen = () => {
  const events = useEvents();
  console.log('EventsScreen -> events', events)
  return (
    <View style={{flex: 1}}>
      <Text>Event Screen</Text>
    </View>
  )
};

export default EventsScreen;
