import React, { useEffect } from 'react';

async function inviteFriendWatcher(channel, handleInviteFriendByWebsocket) {
  let asyncIterator = channel.createConsumer();
  while (true) {
    let packet = await asyncIterator.next();
    if (packet.done) break;
    handleInviteFriendByWebsocket(packet.value);
  }
}

async function rejectFriendWatcher(channel, handleRejectFriendByWebsocket) {
  let asyncIterator = channel.createConsumer();
  while (true) {
    let packet = await asyncIterator.next();
    if (packet.done) break;
    handleRejectFriendByWebsocket(packet.value);
  }
}

async function approveFriendWatcher(channel, handleApproveFriendByWebsocket) {
  let asyncIterator = channel.createConsumer();
  while (true) {
    let packet = await asyncIterator.next();
    if (packet.done) break;
    handleApproveFriendByWebsocket(packet.value);
  }
}

const BasicSubscribe = ({socket, userId, handleInviteFriendByWebsocket, handleRejectFriendByWebsocket, handleApproveFriendByWebsocket}) => {
  useEffect(() => {
    const approveFriendChannel = socket.subscribe(`friend.approveFriend.${userId}`);
    approveFriendWatcher(approveFriendChannel, handleApproveFriendByWebsocket);

    const inviteFriendChannel = socket.subscribe(`friend.inviteFriend.${userId}`);
    inviteFriendWatcher(inviteFriendChannel, handleInviteFriendByWebsocket);

    const rejectFriendChannel = socket.subscribe(`friend.rejectFriend.${userId}`);
    rejectFriendWatcher(rejectFriendChannel, handleRejectFriendByWebsocket);

    return () => {
      rejectFriendChannel.kill();
      inviteFriendChannel.kill();
    }
  }, []);
  return null;
};

export default BasicSubscribe;
