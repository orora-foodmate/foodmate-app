import React from 'react';
import isEmpty from 'lodash/isEmpty';
import Button from '~/components/Button';
import { EVENT_STATUS } from '~/constants/common';

const getEventUserIds = (event, authUserId) => {
  return event.users.find((user) => user.info.id === authUserId);
};

const DisabledButton = ({ title, ...props }) => {
  return <Button {...props} title={title} disabled onPress={() => false} />;
};

const EventButton = ({ event, authUserId, onJoinClick, ...props }) => {
  if (authUserId === event.creator.id) {
    return <DisabledButton {...props} title='主辦人' />;
  }

  if (event.userCountMax <= event.users.length) {
    return <DisabledButton {...props} title='已滿團' />;
  }

  const user = getEventUserIds(event, authUserId);

  if (!isEmpty(user)) {
    return user.info.status !== 1
      ? <DisabledButton {...props} title='等待審核' />
      : <DisabledButton {...props} title='活動即將進行' />;
  }

  return <Button title='我要參加' {...props} onPress={onJoinClick} />;

};

export default EventButton;
