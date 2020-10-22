import React, { useEffect } from 'react';

async function inviteFriendWatcher(channel, userId, handleInviteFriendByWebsocket) {
  let asyncIterator = channel.createConsumer();
  while (true) {
    let packet = await asyncIterator.next();
    if (packet.done) break;
    handleInviteFriendByWebsocket(packet.value);
    console.log('inviteFriendWatcher -> packet.value', packet.value)
  }
}

const BasicSubscribe = ({socket, userId, handleInviteFriendByWebsocket}) => {
  useEffect(() => {
    const channel = socket.subscribe(`friend.inviteFriend.${userId}`);
    inviteFriendWatcher(channel, userId, handleInviteFriendByWebsocket);
    return () => channel.kill();
  }, []);
  return null;
};

export default BasicSubscribe;
