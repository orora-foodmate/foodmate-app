import React, { Fragment, useEffect, useState } from 'react';
import { useNavigation } from 'react-native-navigation-hooks';
import { useFriendRooms } from '~/models';
import RoomItem from './components/RoomItem';

const MessageScreen = (props) => {
  const friendRooms = useFriendRooms();
  const { push } = useNavigation();

  useEffect(() => {
    props.handleGetRooms();
  }, []);

  return (
    <Fragment>
      {friendRooms.map((item) => {
        return (
          <RoomItem
            key={`room-${item.id}`}
            push={push}
            socket={props.socket}
            name={item.name}
            account={item.account}
            avatar={item.avatar}
            roomId={item.id}
            userId={props.userId}
            handleAddMessageByWebsocket={props.handleAddMessageByWebsocket}
          />
        );
      })}
    </Fragment>
  );
};

MessageScreen.options = {
  topBar: {
    title: {
      text: 'Message',
    },
  },
  bottomTab: {
    text: 'Message',
  },
};

export default MessageScreen;
