import React, { useEffect } from 'react';
import { ListItem, Avatar } from 'react-native-elements';

async function asyncIteratorWatcher(channel, userId, handleAddMessageByWebsocket) {
  let asyncIterator = channel.createConsumer();
  while (true) {
    let packet = await asyncIterator.next();
    if (packet.done) break;
    const {user} = packet.value;
    if(user.id !== userId) {
      handleAddMessageByWebsocket(packet.value);
    }
  }
}

const RoomItem = ({ socket, userId, name, account, avatar, roomId, push, handleAddMessageByWebsocket }) => {
  console.log("RoomItem -> roomId", roomId)
  useEffect(() => {
    const channel = socket.subscribe(`room.newMessage.${roomId}`);
    asyncIteratorWatcher(channel, userId, handleAddMessageByWebsocket);
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
