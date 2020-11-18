import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useEvents} from '~/models';
import {Card, Icon, Image} from 'react-native-elements';
import {
  useNavigation,
  useNavigationButtonPress,
} from 'react-native-navigation-hooks';
import colors from '~/theme/color';
import format from 'date-fns/format';
import Text from '~/components/Text';
import Label from '~/components/Label';

const TOP_BAR_RIGHT_BUTTON_ID = '#$%_right_button';

const {width} = Dimensions.get('window');

const EventCard = ({event, push}) => {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => push('EventDetail', {passProps: {eventId: event.id}})}>
      <View style={styles.card}>
        <Image source={{uri: event.logo}} style={styles.cardImage} />
        <View style={styles.cardBody}>
          <View style={styles.datetime}>
            <Text style={styles.datetimeText}>
              <Icon
                size={14}
                type='font-awesome'
                name='circle'
                style={styles.dotIcon}
                color={colors.primary}
              />
              {format(new Date(event.datingAt), 'yyyy-MM-dd HH:mm')}
            </Text>
          </View>
          <View>
            <Text h3>{event.title}</Text>
            <Text h6>{`主辦人: ${event.creator.name}`}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const EventsScreen = (props) => {
  const events = useEvents();
  const {push} = useNavigation();

  useNavigationButtonPress((e) => {
    if (
      props.componentId === e.componentId &&
      e.buttonId === TOP_BAR_RIGHT_BUTTON_ID
    ) {
      push('CreateEvent');
    }
  });

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item) => item.id}
        data={events}
        contentContainerStyle={styles.list}
        renderItem={({item}) => {
          return <EventCard event={item} push={push}/>;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 5,
  },
  cardContainer: {
    width: width / 2 - 10,
  },
  card: {
    margin: 5,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  cardImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  cardBody: {
    padding: 10,
  },
  datetime: {
    // alignItems: 'center'
  },
  dotIcon: {
    marginRight: 5,
  },
  datetimeText: {
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0
  }
});

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
