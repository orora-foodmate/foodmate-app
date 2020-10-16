import React, { useEffect } from 'react';
import { ListItem, Avatar } from 'react-native-elements';

async function asyncIteratorWatcher(channel) {
  let asyncIterator = channel.createConsumer();
  while (true) {
    let packet = await asyncIterator.next();
    if (packet.done) break;
    console.log('Packet:', packet.value);
  }
}

const RoomItem = ({ socket, name, account, avatar, roomId, push }) => {
  useEffect(() => {
    const channel = socket.subscribe(`room.newMessage.${roomId}`);
    asyncIteratorWatcher(channel);
    return () => channel.kill();
  }, []);

  return (
    <ListItem bottomDivider onPress={() => push("Chat", { roomId })}>
      <Avatar source={{ uri: avatar }} />
      <ListItem.Content>
        <ListItem.Title>{name}</ListItem.Title>
        <ListItem.Subtitle>{account}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default RoomItem;
