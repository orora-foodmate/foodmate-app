import React, { useEffect } from 'react';
import {ListItem, Avatar} from 'react-native-elements';

async function asyncIteratorWatcher(channel, userId) {
  let asyncIterator = channel.createConsumer();
  while (true) {
    let packet = await asyncIterator.next();
    if (packet.done) break;
    
  }
}

const RowItem = ({ item, userId, socket }) => {
  useEffect(() => {
    const channel = socket.subscribe(`friend.${item.friendId}`);
    asyncIteratorWatcher(channel, userId);
    return () => channel.kill();
  }, []);
  return (
    <ListItem bottomDivider>
      <Avatar source={{uri: item.avatar}} />
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{item.account}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default RowItem;
