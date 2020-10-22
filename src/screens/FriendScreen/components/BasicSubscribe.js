import React, { useEffect } from 'react';

async function inviteFriendWatcher(channel, userId) {
  let asyncIterator = channel.createConsumer();
  while (true) {
    let packet = await asyncIterator.next();
    if (packet.done) break;
    console.log('inviteFriendWatcher -> packet.value', packet.value)
  }
}

const BasicSubscribe = ({socket, userId}) => {
  useEffect(() => {
    const channel = socket.subscribe(`friend.inviteFriend.${userId}`);
    inviteFriendWatcher(channel, userId);
    return () => channel.kill();
  }, []);
  return null;
};

export default BasicSubscribe;
