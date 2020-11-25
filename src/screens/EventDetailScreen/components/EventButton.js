import React from 'react';
import Button from '~/components/Button';
import { EVENT_STATUS } from '~/constants/common';

const EventButton = ({event, authUserId, handleJoinEvent, ...props}) => {

  if(authUserId === event.creator.id) {
    return (<Button
      title='主揪'
      {...props}
      disabled
      onPress={() => false}
    />);
  }

  if(event.status === 1) {
    return (<Button
      title='已滿團'
      {...props}
      disabled
      onPress={() => false}
    />);
  }

  return (
    <Button
      title='想參加'
      {...props}
      onPress={() => {
        handleJoinEvent({eventId: event.id});
      }}
    />
  );
};

export default EventButton;
