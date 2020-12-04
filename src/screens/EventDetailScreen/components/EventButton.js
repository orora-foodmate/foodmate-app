import React from 'react';
import Button from '~/components/Button';
import { EVENT_STATUS } from '~/constants/common';

const getEventUserIds = event => {
  return event.users.map((user) => user.info.id);
}

const EventButton = ({event, authUserId, onJoinClick, ...props}) => {

  if(authUserId === event.creator.id) {
    return (<Button
      title='主辦人'
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

  if(getEventUserIds(event).includes(authUserId)) {
    return (<Button
      title='活動即將進行'
      {...props}
      disabled
      onPress={() => false}
    />);
  }

  return (
    <Button
      title='我要參加'
      {...props}
      onPress={onJoinClick}
    />
  );
};

export default EventButton;
