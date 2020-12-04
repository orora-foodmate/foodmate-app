import React, {Fragment, useState} from 'react';
import isEmpty from 'lodash/isEmpty';
import format from 'date-fns/format';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Icon, Image} from 'react-native-elements';
import colors from '~/theme/color';
import Text from '~/components/Text';
import Tags from '~/components/Tags';
import Button from '~/components/Button';
import introIcon from '~/assets/icons/icon_intro.png';
import locationIcon from '~/assets/icons/icon_location_primary.png';
import EventPhotoBlock from '~/components/EventPhotoBlock';
import {useEventDetail} from '~/models';
import WebView from 'react-native-webview';
import {iconParticipantActive} from '~/assets/icons';
import EventButton from './components/EventButton';
import JoinDialog from './components/JoinDialog';
import {useNavigation} from 'react-native-navigation-hooks';

const EventDetail = (props) => {

  const [visible, setVisible] = useState(false);
  const { push } = useNavigation();

  if (isEmpty(props.passProps)) return <Fragment />;

  const {eventId} = props.passProps;
  const event = useEventDetail(eventId);

  if (isEmpty(event)) return <Fragment />;

  return (
    <Fragment>
      <JoinDialog visible={visible} push={push} event={event} setVisible={setVisible}/>
      <ScrollView contentContainerStyle={styles.scroll}>
        <EventPhotoBlock hideButton uri={event.logo} />
        <View style={styles.baseInfoContainer}>
          <Text h1 style={styles.title}>
            {event.title}
          </Text>
          <View>
            <Button
              title={`${event.users.length}/${event.userCountMax}`}
              buttonStyle={styles.buttonTagStyle}
              titleStyle={styles.buttonTagTitleStyle}
              icon={
                <Image
                  source={iconParticipantActive}
                  style={styles.buttonImage}
                />
              }
            />
          </View>
        </View>
        <View>
          <Tags />
        </View>
        <View style={styles.datetimeInfo}>
          <View>
            <Text>
              <Icon
                size={16}
                type='font-awesome'
                name='circle'
                color={colors.primary}
                style={styles.dot}
              />
              {format(new Date(event.datingAt), 'yyyy-MM-dd HH:mm')}
            </Text>
            <Text h5>{`主辦人: ${event.creator.name}`}</Text>
          </View>
          <View>
            <EventButton
              event={event}
              authUserId={props.authUserId}
              buttonStyle={styles.buttonStyle}
              titleStyle={styles.buttonTitleStyle}
              onJoinClick={() => setVisible(true)}
            />
          </View>
        </View>
        <View style={styles.subtitle}>
          <Image source={introIcon} style={styles.introIcon} />
          <Text h3>簡介</Text>
        </View>
        <View style={styles.description}>
          <Text style={styles.descriptionText}>{event.description}</Text>
        </View>
        <View style={styles.subtitle}>
          <Image source={locationIcon} style={styles.introIcon} />
          <Text h3>地點</Text>
        </View>
        <View style={styles.place}>
          <Text h4 style={styles.mainPlace}>
            {event.place.structured_formatting.main_text}
          </Text>
          <Text h6 style={styles.subPlace}>
            {event.place.structured_formatting.secondary_text}
          </Text>
        </View>
        <View style={styles.map}>
          <WebView
            style={{width: '100%', height: 600}}
            source={{
              uri: `https://www.google.com/maps/search/?api=1&query=taiwan&query_place_id=${event.place.place_id}&map_action=map`,
            }}
          />
        </View>
      </ScrollView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  scroll: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  baseInfoContainer: {
    padding: 10,
    paddingLeft: 20,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    textAlign: 'left',
  },
  dot: {
    marginRight: 8,
  },
  datetimeInfo: {
    width: '100%',
    paddingLeft: 20,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  introIcon: {
    width: 28,
    height: 28,
    marginRight: 10,
    resizeMode: 'contain',
  },
  subtitle: {
    width: '100%',
    padding: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  description: {
    width: '100%',
    paddingLeft: 24,
    paddingRight: 24,
  },
  descriptionText: {
    fontSize: 18,
  },
  place: {
    paddingLeft: 20,
    width: '100%',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  map: {
    width: '100%',
    height: 600,
  },
  buttonImage: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
  buttonTagStyle: {
    width: 100,
    height: 30,
    borderRadius: 5,
  },
  buttonTagTitleStyle: {
    lineHeight: 14,
    fontSize: 14,
    color: colors.grey,
  },
  buttonStyle: {
    width: 120,
    borderRadius: 5,
  },
  buttonTitleStyle: {
    fontSize: 14,
    lineHeight: 18,
    color: colors.grey,
  },
});

export default EventDetail;
