import React from 'react';
import isEmpty from 'lodash/isEmpty';
import {View} from 'react-native';
import {Card, Icon} from 'react-native-elements';
import {useEventDetail} from '~/models';
import Button from '~/components/Button';
import Text from '~/components/Text';
import Label from '~/components/Label';
import { WebView } from 'react-native-webview';

const id = "5fb291dda7d7ad262d315ca7";
const EventDetail = () => {
  const event = useEventDetail(id);
  if(isEmpty(event)) return null;
  const uri = encodeURI(`https://www.google.com.tw/maps/place/${event.place.structured_formatting.main_text.replace(' ', '+')}`);
  console.log('EventDetail -> uri', uri);
  return (
    <View style={{flex: 1}}>
      <Card>
        <Card.Image source={{uri: event.logo}} />
        <Card.Divider />
        <Card.Title>{event.title}</Card.Title>
        <Label text='tag' />
        <Text h4>
          <Icon size={16} type='font-awesome' name='circle' />
          {event.datingAt}
        </Text>
        <Text h4>{`主辦人: ${event.creator.name}`}</Text>
        <Text h3>簡介</Text>
        <Text h4>{event.description}</Text>
        <Button
          icon={<Icon name='code' color='#ffffff' />}
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
          }}
          title='VIEW NOW'
        />
      </Card>
      <WebView
        source={{ uri }}
      />
      <Text>EventDetail</Text>
    </View>
  );
};

export default EventDetail;
