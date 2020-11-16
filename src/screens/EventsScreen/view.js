import React from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import {useEvents} from '~/models';
import {Card, Icon} from 'react-native-elements';
import Text from '~/components/Text';
import Label from '~/components/Label';

const EventsScreen = () => {
  const events = useEvents();
  console.log("EventsScreen -> events", events)
  return (
    <View style={{flex: 1}}>
      <FlatList
        keyExtractor={(item) => item.id}
        data={events}
        renderItem={({item}) => {
          return (
            <TouchableOpacity onPress={() => alert('hello')}>
              <Card>
                <Card.Image source={{uri: item.logo}} />
                <Card.Divider />
                <Text h4>
                  <Icon size={16} type='font-awesome' name='circle' />
                  {item.datingAt}
                </Text>
                <Text style={{marginBottom: 10}}>{item.title}</Text>
                <Text style={{marginBottom: 10}}>
                  {`主辦人: ${item.creator.name}`}
                </Text>
                <Label text='test' />
              </Card>
            </TouchableOpacity>
          );
        }}
      />
      <Text>Event Screen</Text>
    </View>
  );
};

export default EventsScreen;
