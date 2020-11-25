import React from 'react';
import Button from '~/components/Button';
import { EVENT_STATUS } from '~/constants/common';

const EventButton = ({event, authUserId, ...props}) => {
console.log("EventButton -> authUserId", authUserId)
console.log("EventButton -> event.toJSON()", event.toJSON())
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
      onPress={() => alert('想參加')}
    />
  );
};

export default EventButton;
