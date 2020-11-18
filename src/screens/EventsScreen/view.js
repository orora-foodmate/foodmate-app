import React from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import {useEvents} from '~/models';
import {Card, Icon} from 'react-native-elements';
import {
  useNavigation,
  useNavigationButtonPress,
} from 'react-native-navigation-hooks';
import colors from '~/theme/color';
import Text from '~/components/Text';
import Label from '~/components/Label';

const TOP_BAR_RIGHT_BUTTON_ID = '#$%_right_button';

const EventsScreen = props => {
  const events = useEvents();
  const { push } = useNavigation();

  useNavigationButtonPress((e) => {
    if (
      props.componentId === e.componentId &&
      e.buttonId === TOP_BAR_RIGHT_BUTTON_ID
    ) {
      push('CreateEvent');
    }
  });

  return (
    <View style={{flex: 1}}>
      <FlatList
        keyExtractor={(item) => item.id}
        data={events}
        renderItem={({item}) => {
          return (
            <TouchableOpacity onPress={() => push('EventDetail', { passProps: { eventId: item.id }})}>
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
    </View>
  );
};

EventsScreen.options = {
  topBar: {
    rightButtons: [
      {
        id: TOP_BAR_RIGHT_BUTTON_ID,
        icon: require('assets/icons/create_event.png'),
        color: colors.primary,
      },
    ],
  },
};

export default EventsScreen;
