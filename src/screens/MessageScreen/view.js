import React, { Fragment, useEffect, useState } from 'react';
import { ListItem, Avatar } from 'react-native-elements';

const MessageScreen = (props) => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const sub = props.roomQuery.$.subscribe((r) => {
      setRooms(r);
    });
    props.handleGetRooms();

    return () => {
      sub.unsubscribe();
    };
  }, []);

  return (
    <Fragment>
      {rooms.map((item, index) => {
        const room = item.users.find(u => u._id !== props.userId);
        return (
          <ListItem key={`room-${index}`} bottomDivider>
            <Avatar source={{ uri: room.avatar }} />
            <ListItem.Content>
              <ListItem.Title>{room.name}</ListItem.Title>
              <ListItem.Subtitle>{room.account}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        )
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
