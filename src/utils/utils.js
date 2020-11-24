import pick from 'lodash/pick';
import { parseISOString } from '~/helper/dateHelper';

export const parseEventItem = (event) => {
  return {
    ...event,
    createAt: parseISOString(event.createAt),
    updateAt: parseISOString(event.updateAt),
    finalReviewAt: parseISOString(event.finalReviewAt),
    datingAt: parseISOString(event.datingAt),
  };
};

export const parseEventItems = (events) => events.map(parseEventItem);

export const parseFriendItem = (friend) => {
  const createAt = parseISOString(friend.createAt);
  const updateAt = parseISOString(friend.updateAt);
  return {
    ...pick(friend, [
      'id',
      'avatar',
      'creator',
      'status',
      'account',
      'name',
      'room',
      'friendId',
    ]),
    createAt,
    updateAt,
  }
};

export const parseFriendItems = (friends) => friends.map(parseFriendItem);